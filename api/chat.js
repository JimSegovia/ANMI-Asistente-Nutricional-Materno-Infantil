import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// 1. CONFIGURACIÓN DEL MODELO
// Usamos el 2.0 Flash por ser el más rápido y capaz actualmente
const MODEL_NAME = "gemini-2.0-flash"; 

// 2. PROTECCIÓN ANTI-BLOQUEO (IMPORTANTE)
// Límite de caracteres para no saturar la capa gratuita
const CHAR_LIMIT = 100000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    // --- CAMBIO 1: RECIBIMOS userData DEL FRONTEND ---
    const { prompt, history, userData } = req.body; 
       
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    // --- 1. CONVERTIR HISTORIAL A TEXTO ---
    let conversationHistory = "";
    if (history && Array.isArray(history)) {
        // Tomamos los últimos 15 mensajes para mantener el contexto reciente sin saturar
        const recentHistory = history.slice(-15); 
        conversationHistory = recentHistory.map(msg => {
            const role = msg.sender === "user" ? "USUARIO" : "ASISTENTE (TÚ)";
            return `${role}: ${msg.text}`;
        }).join("\n");
    }

    // --- 2. LEER BASE DE DATOS (data.json) ---
    let contextText = "";
    try {
      const jsonPath = path.join(process.cwd(), 'api', 'data.json');
      
      if (fs.existsSync(jsonPath)) {
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const knowledgeBase = JSON.parse(rawData);

        // A. ORDENAR POR PRIORIDAD (Oficiales primero)
        knowledgeBase.sort((a, b) => {
             const aEsOficial = a.category && a.category.includes("OFICIAL");
             const bEsOficial = b.category && b.category.includes("OFICIAL");
             if (aEsOficial && !bEsOficial) return -1; 
             if (!aEsOficial && bEsOficial) return 1;
             return 0;
        });

        // B. CONSTRUIR TEXTO CON LÍMITE Y LIMPIEZA DE NOMBRES
        let totalChars = 0;

        for (const doc of knowledgeBase) {
            if (totalChars + doc.content.length < CHAR_LIMIT) {
                // Limpiamos el nombre del archivo para que la IA lo lea mejor
                const cleanName = doc.fileName.replace(/\.(pdf|txt)$/i, "").replace(/_/g, " ");
                const tipo = doc.category || "GENERAL";
                
                contextText += `\n--- DOCUMENTO: "${cleanName}" [${tipo}] ---\n${doc.content}\n`;
                totalChars += doc.content.length;
            }
        }
        console.log(`[CTX] Enviando ${totalChars} caracteres a ${MODEL_NAME}.`);
      }
    } catch (err) {
      console.error("Error leyendo contexto:", err);
    }

    // --- CAMBIO 2: CONSTRUIR CONTEXTO DEL PACIENTE ---
    let patientContext = "";
    if (userData && (userData.edad || userData.sexo || userData.extra)) {
        patientContext = `
    === PERFIL DEL PACIENTE ACTUAL ===
    (Usa esta información para filtrar tus respuestas. Si la edad no permite ciertos alimentos según las guías, indícalo claramente).
    - Edad del niño/a: ${userData.edad || "No especificada"}
    - Sexo: ${userData.sexo || "No especificado"}
    - Condición Médica/Notas: ${userData.extra || "Ninguna"}
    ==================================
        `;
    } else {
        patientContext = "=== PERFIL DEL PACIENTE: No proporcionado (Responde de forma general) ===";
    }

    // --- 3. CEREBRO MEJORADO (PERSONALIDAD EXPERTA Y HUMANA) ---
    const finalPrompt = `
    Eres el Asistente de Nutrición Materno Infantil (ANMI).
    Tu misión es dar consejos precisos basados EXCLUSIVAMENTE en los documentos oficiales proporcionados.
    
    ${patientContext}

    CONTEXTO OFICIAL (Tus fuentes de verdad):
    ${contextText}

    HISTORIAL DE LA CONVERSACIÓN:
    ${conversationHistory}
    
    PREGUNTA ACTUAL: "${prompt}"
    
    INSTRUCCIONES ESTRICTAS DE RESPUESTA:
    1. **SEGURIDAD PRIMERO (FILTRO DE EDAD):** Revisa la "Edad del niño/a" en el perfil del paciente. 
       - Si es menor de 6 meses: RECUERDA que solo debe recibir leche materna (LME). No sugieras alimentos sólidos aunque pregunten recetas, aclara primero la restricción de edad.
       - Adapta las porciones y texturas a la edad indicada.

    2. **CITAS NATURALES:** Menciona la fuente de forma fluida dentro de la oración.
       - *Bien:* "Según el Recetario de la Quinua, la sangrecita es excelente..." o "Tal como indica la Norma Técnica de Salud..."
    
    3. **CERO EXTENSIONES:** NUNCA digas ".pdf", ".txt" ni uses guiones bajos al hablar de los documentos. Usa el nombre limpio del documento.

    4. **ULTRACONCISO:** - Ve al grano. Tu respuesta ideal tiene máximo 3 párrafos cortos.
       - Si hay mucha información, da un resumen de los puntos clave.
       - Para recetas, solo menciona los nombres de los platos o ingredientes clave. No des la preparación paso a paso a menos que te la pidan.
    
    5. **FLUIDEZ Y MEMORIA:** - NO saludes si ya hay historial.
       - NO vuelvas a preguntar datos que ya están en el "PERFIL DEL PACIENTE" (ya sabes su edad y sexo).

    6. **FORMATO:** Usa **negritas** para resaltar alimentos o nutrientes.

    7. **CIERRE:** Termina siempre con una pregunta corta para invitar a seguir hablando.
    `;

    // --- 4. EJECUCIÓN ---
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });

  } catch (error) {
    console.error("Gemini Error:", error);
    
    // Manejo de errores amigable
    if (error.message.includes("429") || error.message.includes("exhausted")) {
        res.status(429).json({ error: "El chat está recibiendo muchas consultas. Por favor espera 30 segundos." });
    } else if (error.message.includes("404")) {
        res.status(500).json({ error: "Error de configuración: Modelo no encontrado." });
    } else {
        res.status(500).json({ error: "Error interno: " + error.message });
    }
  }
}