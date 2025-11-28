import React from "react";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-3">

        <img
          src="/android-chrome-512x512.png"
          alt="ANMI Logo"
          className="w-25 object-contain"
        />
        <div className="flex flex-col text-left">

          <h1 className="text-3xl font-extrabold leading-none tracking-tight">
            ANMI
          </h1>

          <p className="text-xs font-medium uppercase tracking-wide leading-tight">
            Asistente Nutricional Materno Infantil
          </p>
        </div>
      </div>
      <div className="disclaimer text-sm px-4">
        ⚠️ <strong>Importante:</strong> Esta es una herramienta informativa y educativa.
        La información proporcionada NO sustituye la consulta con un profesional de la salud.
      </div>
    </header>
  );
}
