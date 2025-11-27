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
    // RECIBIMOS EL PROMPT Y EL HISTORIAL
    const { prompt, history } = req.body;
    
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
                // Ejemplo: "guia_alimentaria.pdf" -> "guia alimentaria"
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

    // --- 3. CEREBRO MEJORADO (PERSONALIDAD EXPERTA Y HUMANA) ---
    const finalPrompt = `
    Eres el Asistente de Nutrición Materno Infantil (ANMI).
    Tu misión es dar consejos precisos basados EXCLUSIVAMENTE en los documentos oficiales proporcionados.
    
    CONTEXTO OFICIAL:
    ${contextText}

    HISTORIAL DE LA CONVERSACIÓN:
    ${conversationHistory}
    
    PREGUNTA ACTUAL: "${prompt}"
    
    INSTRUCCIONES ESTRICTAS DE RESPUESTA:
    1. **CITAS NATURALES:** Menciona la fuente de forma fluida dentro de la oración, como lo haría un experto humano.
       - *Mal:* "Come sangrecita [Fuente: Recetario.pdf]"
       - *Bien:* "Según el Recetario de la Quinua, la sangrecita es excelente..." o "Tal como indica la Norma Técnica de Salud..."
    
    2. **CERO EXTENSIONES:** NUNCA digas ".pdf", ".txt" ni uses guiones bajos al hablar de los documentos. Usa el nombre limpio del documento.

    3. **ULTRACONCISO:** - Ve al grano. Tu respuesta ideal tiene máximo 3 párrafos cortos.
       - Si hay mucha información, da un resumen de los puntos clave y pregunta: "¿Te gustaría saber más detalles sobre alguno?. De ser necesario, pide informacion adicional.
       - No menciones tantas fuentes, como maximo 1 de las mas importantes.
       - Para recetas, solo menciona los nombres de los platos. No des la preparación completa a menos que te la pidan explícitamente.
    
    4. **FLUIDEZ Y MEMORIA:** - NO saludes ("Hola", "Buenos días") si ya hay mensajes previos en el historial. Responde directo a la pregunta.
       - NO vuelvas a preguntar datos que el usuario ya te dijo (como la edad del bebé o si tiene anemia).

    5. **FORMATO:** Usa **negritas** para resaltar los alimentos o nutrientes importantes. Para recetas, preparaciones o indicaciones puedes usar listas enumeradas o guiones

    6. **CIERRE:** Termina siempre con una pregunta corta relacionada para invitar a seguir hablando (ej: "¿Te animas a probarlo?", "¿Tu bebé ya come esto?").
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