import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default function ChatbotPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! 👋 Soy tu Asistente de Nutrición Materno Infantil (ANMI). ¿En qué puedo ayudarte hoy?",
      sender: "bot"
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- 💡 CAMBIO 1: Llamar a scrollToBottom al cambiar los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // -----------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { id: Date.now(), text: prompt, sender: "user" };

    // 1. ACTUALIZAMOS LA VISTA (Aquí sí guardamos TODO para que el usuario pueda hacer scroll hacia arriba)
    const fullHistory = [...messages, userMessage];
    setMessages(fullHistory);

    const inputPrompt = prompt;
    setPrompt("");
    setIsLoading(true);

    // 2. PREPARAMOS EL PAQUETE "LIGERO" PARA LA IA
    // Solo tomamos los últimos 6 mensajes anteriores + el nuevo (Total aprox 15-20 interacciones)
    // Esto ahorra datos y hace que responda más rápido.
    const historyToSend = fullHistory.slice(-20);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputPrompt,
          history: historyToSend // <--- Enviamos la versión recortada
        }),
      });

      if (!res.ok) throw new Error('Error en la red');

      const data = await res.json();
      const botMessage = { id: Date.now() + 1, text: data.text, sender: "bot" };

      // Agregamos la respuesta al historial visual completo
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error capturado:", error);

      // --- CAMBIO EN EL CATCH ---
      // En lugar de poner un texto fijo, usamos 'error.message'.
      // Esto mostrará exactamente lo que tu backend respondió.
      setMessages((prev) => [...prev, {
        id: Date.now(),
        text: `⚠️ ${error.message}`, // Le puse un emoji de alerta
        sender: "bot"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- 💡 CAMBIO 2: Añadir `min-h-screen` y quitar `max-h-screen` al contenedor principal para que cubra toda la altura
    <div className="min-h-screen flex flex-col items-center justify-start">
      {/* Contenedor principal del Chatbot (Fijo) */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-full w-full text-center **h-full** flex flex-col **flex-1** relative">
        
        <div className=" mb-6"> {/* Reduje el mb para más espacio */}
          <h1 className="text-2xl font-bold text-gray-800 text-center">Chatbot ANMI</h1>
        </div>
        
        {/* Chat - ¡AQUÍ ESTÁ EL ARREGLO! */}
        {/* --- 💡 CAMBIO 3: Añadir `overflow-y-auto` y quitar `pr-2` (que causaba un scrollbar duplicado) */}
        <div className="flex-1 mb-4 space-y-4 **overflow-y-auto** p-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-[80%] text-sm leading-relaxed text-left ${msg.sender === "user"
                  ? "bg-indigo-600 text-white" // Color Usuario
                  : "bg-gray-200 text-gray-800" // Color Bot
                  }`}
              >
                <ReactMarkdown
                  components={{
                    // Estilo para negritas (**texto**)
                    strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
                    // Estilo para listas ( * elemento)
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5 mb-2 space-y-1 [&_ul]:list-disc [&_ul]:pl-5" {...props} />
                    ),
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                    // Estilo para elementos de lista
                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                    // Estilo para párrafos
                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input y Botón (Fijos abajo) */}
        <div className="p-4 shrink-0">

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-300 pt-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-lg shadow-md transition-all disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "..." : "Enviar"}
            </button>
          </form>
        </div>
        <p className="text-gray-700 text-sm pl-20 pr-20">
          El chatbot ANMI es solo una herramienta informativa y puede cometer errores; la información aquí proporcionada nunca sustituye el asesoramiento de un profesional cualificado.
        </p>
        
      </div>
      <div className="flex justify-center mt-8 pb-8 shrink-0">
        <Link
          to="/"
          className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
          Volver al Menú Principal
        </Link>
      </div> 
    </div>
  );
}