const fs = require("fs");
const path = require("path");

// Configuración
const BASE_FOLDER = "./api/documents";
const OUTPUT_FILE = "./api/data.json";

// Las carpetas que queremos leer
const FOLDERS_TO_SCAN = ["docs-main", "doc-extra"];

function processTxtFiles() {
  console.log("🚀 Iniciando conversión de TXT a JSON (Modo Carpetas)...");

  if (!fs.existsSync(BASE_FOLDER)) {
    console.error("❌ No encuentro la carpeta base:", BASE_FOLDER);
    return;
  }

  const documents = [];

  // Recorremos cada carpeta configurada
  for (const subfolder of FOLDERS_TO_SCAN) {
    const currentFolderPath = path.join(BASE_FOLDER, subfolder);
    
    // Verificamos si la subcarpeta existe
    if (!fs.existsSync(currentFolderPath)) {
      console.warn(`⚠️ La carpeta '${subfolder}' no existe o está vacía. Saltando...`);
      continue;
    }

    console.log(`📂 Escaneando carpeta: ${subfolder}...`);

    // Leemos los archivos de esa carpeta
    const files = fs.readdirSync(currentFolderPath).filter((f) => f.toLowerCase().endsWith(".txt"));

    for (const file of files) {
      const filePath = path.join(currentFolderPath, file);
      
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        
        // Limpieza
        const cleanContent = content
          .replace(/\r\n/g, "\n")
          .replace(/\s+/g, " ")
          .trim();

        if (cleanContent.length > 0) {
          // ETIQUETADO INTELIGENTE:
          // Le decimos a Gemini si esto es info Principal o Extra
          const category = subfolder === "docs-main" ? "DOCUMENTO OFICIAL (PRIORIDAD ALTA)" : "INFORMACIÓN COMPLEMENTARIA";

          documents.push({
            fileName: file,
            category: category, // Guardamos la categoría
            content: cleanContent
          });
          console.log(`   ✅ Leído: ${file} [${category}]`);
        }
      } catch (error) {
        console.error(`   ❌ Error leyendo ${file}: ${error.message}`);
      }
    }
  }

  if (documents.length === 0) {
    console.warn("⚠️ No se encontraron archivos .txt en ninguna carpeta.");
    return;
  }

  // Guardamos el JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(documents, null, 2), "utf-8");
  
  console.log("---------------------------------------------------");
  console.log(`✨ ¡LISTO! Se procesaron ${documents.length} documentos.`);
  console.log(`💾 JSON generado en: ${OUTPUT_FILE}`);
  console.log("---------------------------------------------------");
}

processTxtFiles();