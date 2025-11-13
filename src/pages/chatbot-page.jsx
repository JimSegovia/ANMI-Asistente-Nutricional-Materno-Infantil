import React from "react";
import { Link } from "react-router-dom";

export default function ChatbotPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 p-6 rounded-2xl shadow-lg  ">
      {/* Contenedor principal */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Chatbot 🤖
        </h1>

        <p className="text-gray-600 mb-6">
          Aquí irá toda la funcionalidad de tu chatbot.  
          Podrás conversar con el asistente, hacer consultas y explorar funciones interactivas.
        </p>

        <Link
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
          Volver al Menú Principal
        </Link>
      </div>

      {/* Versión o pie de página opcional */}
      <p className="text-white/80 mt-8 text-sm">
        Versión Beta — Proyecto ANMI
      </p>
    </div>
  );
}
