import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Configuracion() {
  const navigate = useNavigate();

  const [installPrompt, setInstallPrompt] = useState(null);

  // ================================
  // Capturar beforeinstallprompt
  // ================================
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      window._anmiInstallPrompt = e;  // lo guardamos global
      setInstallPrompt(e);
    };

    // Si el prompt ya ocurrió antes, recuperarlo
    if (window._anmiInstallPrompt) {
      setInstallPrompt(window._anmiInstallPrompt);
    }

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    await installPrompt.userChoice;

    // ya no se puede usar de nuevo
    window._anmiInstallPrompt = null;
    setInstallPrompt(null);
  };

  // ====================
  // Limpiar caché
  // ====================
  const handleClearCache = () => {
    caches.keys().then((names) => {
      for (let name of names) caches.delete(name);
    });
    alert("La caché ha sido eliminada.");
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            ⚙️ Configuración
          </h1>
          <p className="text-gray-600 text-lg">
            Ajustes de tu aplicación ANMI
          </p>
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              ⚠️ <strong>Importante:</strong> Configura opciones del sistema o instala la app en tu dispositivo.
            </p>
          </div>
        </div>
      </div>

      {/* Opciones */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Instalar App */}
        {installPrompt && (
          <div
            onClick={handleInstall}
            className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 cursor-pointer 
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              📲 Instalar App
            </h2>
            <p className="text-gray-600">
              Añade ANMI a tu dispositivo para acceso rápido y sin navegador.
            </p>
          </div>
        )}

        {/* Eliminar caché */}
        <div
          onClick={handleClearCache}
          className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 cursor-pointer 
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🗑️ Eliminar caché
          </h2>
          <p className="text-gray-600">
            Borra datos guardados y fuerza una actualización completa.
          </p>
        </div>

        {/* Privacidad */}
        <div
          onClick={() => navigate("/privacidad")}
          className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 cursor-pointer
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🔐 Manifesto de Privacidad
          </h2>
          <p className="text-gray-600">
            Aprende cómo protegemos tus datos y cómo funciona la información.
          </p>
        </div>

      </div>
    </div>
  );
}
