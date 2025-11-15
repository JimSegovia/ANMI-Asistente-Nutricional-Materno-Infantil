import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PlanAnemiaPage() {
  return (
    <div className="min-h-screen">

      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50 rounded-b-3xl">
        <div className="max-w-5xl mx-auto flex items-center gap-4 p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Plan Nacional contra la Anemia y la DCI
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mt-6">

        {/* Introducción */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">2.1. Introducción</h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            El <strong>Plan Nacional contra la Anemia</strong> es la principal estrategia
            multisectorial del país para enfrentar la anemia y la desnutrición crónica infantil.
            Está liderado por el <strong>Ministerio de Salud (MINSA)</strong> y cuenta con la participación
            del MIDIS, MINEDU, Ministerio de Vivienda, así como los gobiernos regionales y locales.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Su propósito es definir objetivos, indicadores y las <strong>intervenciones clave</strong> que
            todas estas entidades deben ejecutar de manera coordinada.
          </p>

          <p className="text-gray-700 leading-relaxed">
            El plan vigente es el <strong>Plan Multisectorial para la Prevención y Reducción de la
            Anemia Materno Infantil en el Perú 2024-2030</strong>.
          </p>

            {/* Imagen debajo de introducción */}
          <div className="w-full rounded-2xl overflow-hidden shadow-md mt-4">
            <img
              src="https://pbs.twimg.com/media/DrfZsvLW4AA7iM5.jpg"
              alt="Plan Nacional contra la Anemia"
              className="w-full h-64 object-cover"
            />
          </div>
        
        </section>

        {/* Objetivo Principal */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">2.2. Objetivo Principal</h2>

          <p className="text-gray-700 leading-relaxed">
            Reducir la prevalencia de la anemia en niños menores de 36 meses 
            (especialmente durante el primer año de vida) y en gestantes, así como 
            disminuir la desnutrición crónica infantil.
          </p>
        </section>

        {/* Intervenciones Clave */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">2.3. Intervenciones Clave</h2>

          <p className="text-gray-700 mb-4">
            Estas son las principales acciones definidas por el Plan, que se ejecutan desde los
            centros de salud y programas sociales, especialmente para bebés de 6 a 12 meses:
          </p>

          <ul className="space-y-5">

            <li className="bg-gray-50 border-l-4 border-red-400 p-4 rounded-xl shadow-sm text-gray-700">
              <strong>Suplementación preventiva:</strong> entrega gratuita de suplementos de hierro
              (gotas o Nutri-Hierro) desde los 6 meses, o desde los 4 meses si el bebé es prematuro.
            </li>

            <li className="bg-gray-50 border-l-4 border-red-400 p-4 rounded-xl shadow-sm text-gray-700">
              <strong>Tamizaje (despistaje):</strong> examen de hemoglobina mediante pinchazo en el dedo.
              El control más importante es el de los 6 meses.
            </li>

            <li className="bg-gray-50 border-l-4 border-red-400 p-4 rounded-xl shadow-sm text-gray-700">
              <strong>Tratamiento oportuno:</strong> entrega de jarabe de sulfato ferroso u otro tratamiento
              para los niños diagnosticados con anemia.
            </li>

            <li className="bg-blue-50 p-4 rounded-xl shadow-sm text-gray-700">
              <strong>Consejería nutricional:</strong> el personal de salud debe brindar orientación
              activa durante el CRED, promoviendo:
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Lactancia materna exclusiva hasta los 6 meses.</li>
                <li>Correcta alimentación complementaria desde los 6 meses.</li>
                <li>Consumo frecuente de alimentos ricos en hierro (sangrecita, hígado, carnes rojas).</li>
              </ul>
            </li>

            <li className="bg-blue-50 p-4 rounded-xl shadow-sm text-gray-700">
              <strong>Agua segura y saneamiento:</strong> fomentar el consumo de agua clorada y el lavado de
              manos para prevenir enfermedades que pueden causar anemia.
            </li>

          </ul>
        </section>

{/* Más información */}
<section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Más información</h2>

  <p className="text-gray-700 mb-4">
    Recursos oficiales y documentos útiles sobre la prevención de la anemia:
  </p>

  <ul className="space-y-4 text-gray-700">

    {/* Recurso 1 */}
    <li className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
      <a
        href="https://www.gob.pe/institucion/minsa/normas-legales/5093832-002-2024-sa"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-red-700 hover:underline"
      >
        📄 Plan Multisectorial contra la Anemia 2024–2030 (PDF oficial)
      </a>
      <p className="text-sm mt-1 text-gray-600">
        Documento del MINSA con estrategias nacionales de prevención y reducción de anemia infantil.
      </p>
    </li>

  </ul>
</section>


        {/* Botón volver */}
        <div className="text-center mt-10 pb-10">
          <Link
            to="/servicios-estado"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            ← Volver a Servicios del Estado
          </Link>
        </div>

      </div>
    </div>
  );
}
