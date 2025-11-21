import dotenv from "dotenv"

dotenv.config()

async function testConnection() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    console.error("❌ ERROR: No se encontró GEMINI_API_KEY en el archivo .env")
    return
  }

  console.log("✅ API Key encontrada.")

  try {
    console.log("🔍 Consultando modelos disponibles para tu API Key...")

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)

    if (!response.ok) {
      throw new Error(`Error HTTP al listar modelos: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.models) {
      console.log("\n📋 Modelos disponibles:")
      data.models.forEach((m) => {
        // Filtramos solo los que sirven para generar contenido
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
          console.log(` - ${m.name.replace("models/", "")}`)
        }
      })
      console.log("\nIntenta usar uno de estos nombres en tu código.")
    } else {
      console.log("⚠️ No se encontraron modelos. Tu API Key podría no tener permisos correctos.")
    }
  } catch (error) {
    console.error("❌ ERROR DE CONEXIÓN:")
    console.error(error.message)
  }
}

testConnection()
