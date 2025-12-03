import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

// Lista de documentos y fuentes (simplificada para logos)
const sources = [
  { name: "Ministerio de Salud (MINSA)", logo: "/previews/minsa.png" },
  { name: "Instituto Nacional de Salud (INS/CENAN)", logo: "/previews/cenan.png" },
  { name: "Organismos Internacionales (OMS/OPS/UNICEF)", logo: "/previews/oms.jpg" },
];

// Estado 1: Bienvenida y Capacidades
const WelcomeScreen = ({ nextStep }) => (
  // Se ha modificado el padding y el control de altura para adaptarse al contenedor padre
  <div className="flex flex-col items-center justify-start h-full pt-4 pb-2 text-center flex-grow"> 
    <div className="w-full mb-auto"> {/* mb-auto asegura que el contenido empuje el botón de abajo */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        ¡Bienvenido a tu Asistente ANMI!
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Soy tu guía especializada en nutrición materno infantil y prevención de la anemia.
      </p>

      {/* Lo que PUEDE y NO PUEDE hacer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h3 className="font-bold text-green-700 flex items-center mb-2">
            <Check size={20} className="mr-2" />
            Lo que PUEDO hacer
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Responder preguntas sobre alimentación complementaria.</li>
            <li>Brindar información sobre suplementación con hierro.</li>
            <li>Consultar documentos oficiales del MINSA/INS.</li>
            <li>Ofrecer datos sobre programas sociales de apoyo.</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <h3 className="font-bold text-red-700 flex items-center mb-2">
            ❌ Lo que NO DEBO hacer
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Reemplazar la consulta con un médico o nutricionista.</li>
            <li>Hacer diagnósticos o prescribir tratamientos.</li>
            <li>Ofrecer consejos sobre casos médicos complejos.</li>
            <li>Manejar información personal sensible (el chat es anónimo).</li>
          </ul>
        </div>
      </div>
    </div>
    
    {/* Fuentes */}
    <div className="w-full mt-6 pt-4 border-t border-gray-200">
      <p className="text-m font-semibold text-gray-700 mb-3">
        Fuentes de Conocimiento Validado:
      </p>
      <div className="flex justify-center flex-wrap gap-9 items-center">
        {sources.map(source => (
          <div key={source.name} className="flex flex-col items-center">
            {/* Usar placeholder o ruta real si tienes los logos */}
            <img src={source.logo} alt={source.name} className="w-20 h-20 object-contain mb- rounded-2xl" 
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/5a67d8/ffffff?text=${source.name.substring(0, 3)}`; }}
            />
            <span className="text-xs text-gray-500 max-w-[80px] leading-tight">{source.name}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Botón Siguiente */}
    <button
      onClick={nextStep}
      className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all flex items-center shrink-0"
    >
      Entendido, Siguiente paso <ArrowRight size={20} className="ml-2" />
    </button>
  </div>
);

// Estado 2: Aceptación de Términos
const TermsScreen = ({ agree, setAgree, handleAccept }) => (
  // Se ha modificado el padding y el control de altura para adaptarse al contenedor padre
  <div className="flex flex-col items-center justify-start h-full pt-4 pb-2 text-center flex-grow">
    <div className="w-full mb-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Términos de Uso y Privacidad
      </h1>
      <p className="text-gray-600 mb-6">
        Para usar el chatbot, debes aceptar los siguientes términos y confirmar que entiendes su propósito.
      </p>

      {/* Contenido simplificado de términos (para un prototipo) */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 h-80 overflow-y-auto text-left text-sm text-gray-700">
        <p className="font-semibold mb-2">1. Alcance y Propósito</p>
        <p className="mb-3">ANMI es una herramienta educativa e informativa. La información aquí contenida no constituye una consulta médica, diagnóstico, ni sustituye el consejo de un profesional de la salud. Úsala únicamente como soporte de información.</p>
        
        <p className="font-semibold mb-2">2. Privacidad y Datos</p>
        <p className="mb-3">Este chat es anónimo. No recopilamos ni almacenamos tus mensajes de chat más allá de la duración de tu sesión actual. Si deseas más detalles, consulta el Manifiesto de Privacidad en la sección Configuración.</p>
        
        <p className="font-semibold mb-2">3. Uso Responsable</p>
        <p>Aceptas no utilizar esta herramienta para emergencias médicas o para intentar autodiagnosticar o autotratar condiciones graves de salud.</p>
      </div>
      
      {/* Checkbox de Aceptación */}
      <div className="mt-6 flex items-center justify-center">
        <input
          id="privacy-check"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="privacy-check" className="ml-3 text-gray-700 font-medium cursor-pointer">
          Acepto los términos de uso y privacidad.
        </label>
      </div>
    </div>

    {/* Botón Acceder */}
    <button
      onClick={handleAccept}
      disabled={!agree}
      className={`mt-6 font-semibold px-8 py-3 rounded-xl shadow-md transition-all flex items-center shrink-0 ${
        agree
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-gray-400 text-gray-700 cursor-not-allowed'
      }`}
    >
      Acceder al Chatbot <ArrowRight size={20} className="ml-2" />
    </button>
  </div>
);


export default function ChatbotOnboarding() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    if (agreed) {
      // Navegamos al chat real. Usaremos una nueva ruta: /chat-real
      navigate("/chat-real");
    }
  };

  return (
    // Contenedor principal de la pantalla (centrado)
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Contenedor del contenido (Onboarding steps) */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 max-w-full w-[600px] min-h-[700px] flex flex-col items-center">
        
        {step === 1 && (
          <WelcomeScreen nextStep={() => setStep(2)} />
        )}

        {step === 2 && (
          <TermsScreen agree={agreed} setAgree={setAgreed} handleAccept={handleAccept} />
        )}
        
      </div>
      
      {/* 🔘 Botón Volver (FUERA del div del contenido, para que el navegador lo posicione abajo) */} 
      <div className="flex justify-center mt-8">
        <Link
          to="/"
          // Estilo modificado para verse bien en el fondo morado
          className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
          Volver al Menú Principal
        </Link>
      </div> 
    </div>
  );
}