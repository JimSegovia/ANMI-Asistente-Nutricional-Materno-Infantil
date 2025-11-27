# 🍼 ANMI - Asistente Nutricional Materno Infantil

**Asistente Nutricional Materno Infantil (ANMI)** es un proyecto prototipo de aplicación web progresiva (PWA) diseñado para proporcionar orientación nutricional a padres y cuidadores en Perú, con un enfoque en la prevención de la anemia infantil y la desnutrición crónica.

El proyecto se centra en la etapa crítica de la alimentación complementaria (6 a 23 meses), utilizando inteligencia artificial para responder consultas con información validada a partir de documentos oficiales del Ministerio de Salud (MINSA) y el Instituto Nacional de Salud (INS).

## 🌐 Demo en Vivo

Puedes acceder a la versión desplegada de la aplicación aquí:

**[https://asistente-nutricional-materno-infantil.vercel.app/](https://asistente-nutricional-materno-infantil.vercel.app/)**

---

## ✨ Capacidades y Características Principales

El proyecto ofrece una suite de módulos informativos basados en normativas peruanas de salud:

1.  **🤖 Chatbot ANMI:** Un asistente virtual que utiliza la API de Google Gemini para procesar preguntas y generar respuestas concisas y profesionales, utilizando como base una librería interna de documentos PDF (MINSA/CENAN).
2.  **📚 Biblioteca de Documentos:** Acceso a guías, normas técnicas y recetarios oficiales del MINSA, INS, OMS y UNICEF. La interfaz permite la visualización integrada de documentos PDF (PWA) y la descarga directa.
3.  **🍽️ Guía de Platillos Nutritivos:** Recetario interactivo con un selector de categoría entre **Recetas para Bebés** (6-11 meses) y **Recetas Corrientes** (Familia). Incluye ingredientes y pasos de preparación enfocados en la alta densidad de hierro.
4.  **🥩 Información Nutricional:** Guía detallada sobre alimentos ricos en hierro (fuentes animales y vegetales) con recomendaciones clave para optimizar la absorción de nutrientes en bebés.
5.  **🏛️ Servicios del Estado:** Información clave sobre los programas sociales y estrategias sanitarias relevantes en Perú: Plan Nacional contra la Anemia, Cuna Más y Qali Warma.
6.  **⚙️ PWA (Progressive Web App):** La aplicación es instalable en dispositivos móviles para acceso *offline* y cuenta con opciones de configuración del sistema y gestión de caché.

---

## 🛠️ Tecnologías y Estructura

* **Frontend:** [React](https://react.dev/) (v19), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
* **Backend (Chatbot API):** Serverless Function (Node.js)
* **Inteligencia Artificial:** Google Gemini API (`@google/generative-ai`)
* **Manejo de Datos:** Uso de `pdf-parse` para ingesta de conocimiento y `react-router-dom` para la gestión de rutas.

---

## 🚀 Instalación y Ejecución Local

### 1. Requisitos

* Node.js (versión `>=18`)
* Una clave de API de Google Gemini.

### 2. Configuración

1.  Clona el repositorio:
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd ANMI-Asistente-Nutricional-Materno-Infantil
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  **API Key:** Crea un archivo `.env` en la raíz y añade:
    ```
    GEMINI_API_KEY="TU_CLAVE_DE_GEMINI"
    ```

### 3. Iniciar el Desarrollo

Ejecuta el servidor local:
```bash
npm run dev