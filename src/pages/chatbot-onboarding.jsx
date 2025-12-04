import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight, User, Baby, Calendar, FileText } from "lucide-react";

// Lista de documentos y fuentes (simplificada para logos)
const sources = [
  { name: "Ministerio de Salud (MINSA)", logo: "/previews/minsa.png" },
  { name: "Instituto Nacional de Salud (INS/CENAN)", logo: "/previews/cenan.png" },
  { name: "Organismos Internacionales (OMS/OPS/UNICEF)", logo: "/previews/oms.jpg" },
];

// Estado 1: Bienvenida y Capacidades
const WelcomeScreen = ({ nextStep }) => (
  <div className="flex flex-col items-center justify-start h-full pt-4 pb-2 text-center flex-grow"> 
    <div className="w-full mb-auto">
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
  <div className="flex flex-col items-center justify-start h-full pt-4 pb-2 text-center flex-grow">
    <div className="w-full mb-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Términos de Uso y Privacidad
      </h1>
      <p className="text-gray-600 mb-6">
        Para usar el chatbot, debes aceptar los siguientes términos y confirmar que entiendes su propósito.
      </p>

      {/* Contenido simplificado de términos */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 h-80 overflow-y-auto text-left text-sm text-gray-700">
        <p className="font-semibold mb-2">1. Alcance y Propósito</p>
        <p className="mb-3">ANMI es una herramienta educativa e informativa. La información aquí contenida no constituye una consulta médica, diagnóstico, ni sustituye el consejo de un profesional de la salud. Úsala únicamente como soporte de información.</p>
        
        <p className="font-semibold mb-2">2. Privacidad y Datos</p>
        <p className="mb-3">Este chat es anónimo. Los datos básicos que proporciones (como la edad del bebé) se guardan solo en tu dispositivo para mejorar las respuestas y puedes borrarlos cuando quieras.</p>
        
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
      Aceptar y Continuar <ArrowRight size={20} className="ml-2" />
    </button>
  </div>
);

// Estado 3: Formulario de Datos
const DataFormScreen = ({ onFinish, onSkip }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    sexo: "",
    extra: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-start h-full pt-4 pb-2 text-center flex-grow relative">
      
      {/* Botón Omitir Superior */}
      <button 
        onClick={onSkip}
        className="absolute top-0 right-0 text-gray-400 hover:text-indigo-600 text-sm font-medium transition-colors"
      >
        Omitir este paso
      </button>

      <div className="w-full mb-auto mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Ayúdanos a conocerte
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Si nos das algunos datos básicos, el asistente podrá darte respuestas más precisas sobre alimentación y dosis.
        </p>

        <form className="space-y-4 text-left">
          {/* Edad (Dato clave) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Calendar size={16} className="mr-2 text-indigo-500"/> Edad del bebé (Meses/Años)
            </label>
            <input
              type="text"
              name="edad"
              placeholder="Ej: 8 meses"
              value={formData.edad}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Baby size={16} className="mr-2 text-indigo-500"/> Sexo
            </label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            >
              <option value="">Seleccionar...</option>
              <option value="Niño">Niño</option>
              <option value="Niña">Niña</option>
            </select>
          </div>

          {/* Info Extra */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText size={16} className="mr-2 text-indigo-500"/> ¿Alguna condición? (Anemia, Prematuro...)
            </label>
            <textarea
              name="extra"
              rows="2"
              placeholder="Ej: Le detectaron anemia leve..."
              value={formData.extra}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>
        </form>
      </div>

      <button
        onClick={() => onFinish(formData)}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all flex items-center shrink-0 w-full justify-center"
      >
        Guardar y Empezar <ArrowRight size={20} className="ml-2" />
      </button>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function ChatbotOnboarding() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // <--- NUEVO ESTADO PARA EVITAR PARPADEO
  const navigate = useNavigate();

  // --- CORRECCIÓN CLAVE: VERIFICAR SI YA EXISTEN DATOS AL INICIAR ---
  useEffect(() => {
    const storedData = localStorage.getItem("anmi_user_data");
    if (storedData) {
      // Si ya existen datos, redirigimos INMEDIATAMENTE
      navigate("/chat-real");
    } else {
      // Si no existen datos, dejamos de "checkear" y mostramos el contenido
      setIsChecking(false);
    }
  }, [navigate]);

  // Paso 1 -> 2
  const nextStep = () => setStep(2);

  // Paso 2 -> 3 (Al aceptar términos)
  const handleAcceptTerms = () => {
    if (agreed) setStep(3);
  };

  // Finalizar (Con datos)
  const handleFinishData = (data) => {
    localStorage.setItem("anmi_user_data", JSON.stringify(data));
    navigate("/chat-real");
  };

  // Finalizar (Sin datos / Omitir)
  const handleSkip = () => {
    localStorage.setItem("anmi_user_data", JSON.stringify({ skipped: true }));
    navigate("/chat-real");
  };

  // --- TRUCO ANTI-PARPADEO ---
  // Si todavía estamos verificando el localStorage, no renderizamos nada (o un spinner)
  if (isChecking) {
    return null; // Pantalla en blanco por unos milisegundos, evita el salto visual
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 max-w-full w-[600px] min-h-[700px] flex flex-col items-center">
        
        {step === 1 && <WelcomeScreen nextStep={nextStep} />}
        
        {step === 2 && (
          <TermsScreen 
            agree={agreed} 
            setAgree={setAgreed} 
            handleAccept={handleAcceptTerms} 
          />
        )}

        {step === 3 && (
          <DataFormScreen 
            onFinish={handleFinishData} 
            onSkip={handleSkip} 
          />
        )}

      </div>
      
      {/* Botón volver */}
      <div className="flex justify-center mt-8">
         <Link to="/" className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300">
           Volver al Menú Principal
         </Link>
      </div>
    </div>
  );
}