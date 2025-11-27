import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const MODEL_NAME = "gemini-2.0-flash"; 
const CHAR_LIMIT = 100000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    // RECIBIMOS EL PROMPT Y EL HISTORIAL
    const { prompt, history } = req.body;
    
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    // --- 1. CONVERTIR HISTORIAL A TEXTO ---
    // Convertimos el array de objetos a un texto tipo guion teatral
    let conversationHistory = "";
    if (history && Array.isArray(history)) {
        // Tomamos los últimos 10 mensajes para no saturar
        const recentHistory = history.slice(-15); 
        conversationHistory = recentHistory.map(msg => {
            const role = msg.sender === "user" ? "USUARIO" : "ASISTENTE (TÚ)";
            return `${role}: ${msg.text}`;
        }).join("\n");
    }

    // --- 2. LEER BASE DE DATOS (Igual que antes) ---
    let contextText = "";
    try {
      const jsonPath = path.join(process.cwd(), 'api', 'data.json');
      if (fs.existsSync(jsonPath)) {
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const knowledgeBase = JSON.parse(rawData);

        knowledgeBase.sort((a, b) => {
             const aEsOficial = a.category && a.category.includes("OFICIAL");
             const bEsOficial = b.category && b.category.includes("OFICIAL");
             if (aEsOficial && !bEsOficial) return -1; 
             if (!aEsOficial && bEsOficial) return 1;
             return 0;
        });

        let totalChars = 0;
        for (const doc of knowledgeBase) {
            if (totalChars + doc.content.length < CHAR_LIMIT) {
                const tipo = doc.category || "GENERAL";
                contextText += `\n--- FUENTE: ${doc.fileName} [${tipo}] ---\n${doc.content}\n`;
                totalChars += doc.content.length;
            }
        }
      }
    } catch (err) {
      console.error("Error contexto:", err);
    }

   
// --- 3. CEREBRO CON MEMORIA Y PERSONALIDAD ---
// --- 3. CEREBRO MEJORADO (FUENTES VISIBLES + CONCISO) ---
    const finalPrompt = `
    Eres el Asistente de Nutrición Materno Infantil (ANMI).
    Tu misión es dar datos exactos basados en los documentos oficiales.
    
    CONTEXTO OFICIAL:
    ${contextText}

    HISTORIAL DE LA CONVERSACIÓN:
    ${conversationHistory}
    
    PREGUNTA ACTUAL: "${prompt}"
    
    INSTRUCCIONES ESTRICTAS DE RESPUESTA:
    1. **CITA OBLIGATORIA:** Cada vez que des una recomendación, alimento o cantidad, indica inmediatamente de qué documento salió usando corchetes. 
       *Ejemplo:* "Dale 2 cucharadas de hígado [Fuente: Recetario MINSA]". Si es conocimiento general, no cites.
    
    2. **ULTRACONCISO:** - Tu respuesta NO debe superar los 3 párrafos cortos.
       - Si la respuesta requiere mucha información, da solo los puntos clave y pregunta: "¿Quieres que te explique más a fondo?".
       - Si recomiendas recetas, solo da los nombres de los platos, no la preparación (a menos que te la pidan).

    3. **FLUIDEZ:** - NO saludes ("Hola", "Buenos días") si ya hay mensajes en el historial. Responde directo.
       - Si ya sabes la edad o condición del historial, no la vuelvas a preguntar.

    4. **FORMATO:** Usa **negritas** para resaltar los alimentos o nutrientes clave.
    
    5. **CIERRE:** Termina siempre con una pregunta corta para invitar a seguir hablando.
    `;
    
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });

  } catch (error) {
    console.error("Gemini Error:", error);
    if (error.message.includes("429")) {
        res.status(429).json({ error: "Espera 30 segundos..." });
    } else {
        res.status(500).json({ error: "Error: " + error.message });
    }
  }
}