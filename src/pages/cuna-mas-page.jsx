import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CunaMasPage() {
  return (
    <div className="min-h-screen ">

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
            Programa Nacional Cuna Más
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mt-6 pb-12">

        {/* Resumen Ejecutivo */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">3.1. Resumen Ejecutivo</h2>

          <p className="text-gray-700 leading-relaxed mb-3">
            El <strong>Programa Nacional Cuna Más (PNCM)</strong> es una iniciativa del
            Ministerio de Desarrollo e Inclusión Social (<strong>MIDIS</strong>) cuyo objetivo
            principal es mejorar el desarrollo infantil (cognitivo, social, físico y emocional)
            de niñas y niños menores de 36 meses (0 a 3 años) que viven en condiciones de
            pobreza y pobreza extrema.
          </p>

          <p className="text-gray-700 leading-relaxed mb-3">
            A diferencia de programas escolares como Qali Warma, Cuna Más atiende la
            <strong> primera infancia</strong>, un período crítico donde la nutrición y la prevención
            de la anemia son fundamentales. El servicio se entrega mediante dos modalidades:
            <em> cuidado diurno</em> y <em>visitas domiciliarias</em>.
          </p>

          {/* Imagen representativa */}
          <div className="w-full rounded-2xl overflow-hidden shadow-md mt-4">
            <img
              src="https://scontent.flim2-6.fna.fbcdn.net/v/t39.30808-6/476367111_921491863507836_6620660717608242723_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHVpCV7ya6GNbB4nmWRt5HseSpv4ZBJhMV5Km_hkEmExTCgEBGEYj4pnh0QY8c1qTPBxgeIXBRj5_E6GoxmvZ1O&_nc_ohc=Ql7JBsaOVUYQ7kNvwG2oVok&_nc_oc=AdlDL0NAow52W2XHx161pKaQHLhGZsklbG_WvdSqtrNxM6drBkzhFh97Wectpq_aL9U4Yfx2plgketzZBlRWotge&_nc_zt=23&_nc_ht=scontent.flim2-6.fna&_nc_gid=6fQz48PC4xA2Kyteczscjg&oh=00_Afg9smCtxVO61FShb5UBmoBP6qYGFeDvtTHKx6PaoblvaA&oe=691E9710"
              alt="Programa Cuna Más"
              className="w-full h-64 object-cover"
            />
          </div>
        </section>

        {/* Población Objetivo */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">3.2. Población Objetivo</h2>

          <ul className="space-y-4 text-gray-700">
            <li className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <strong>Niñas y niños menores de 36 meses (0 a 3 años)</strong> en condición de pobreza
              y pobreza extrema.
            </li>
            <li className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <strong>Gestantes</strong> (incluidas en el Servicio de Acompañamiento a Familias)
              para promover cuidado prenatal y preparación para la llegada del bebé.
            </li>
          </ul>
        </section>

        {/* Objetivos Específicos */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">3.3. Objetivos Específicos</h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-3">
            <li>Superar brechas en el desarrollo cognitivo, social, físico y emocional.</li>
            <li>Mejorar conocimientos y prácticas familiares para el cuidado y aprendizaje.</li>
            <li>Brindar atención integral (nutrición, salud y aprendizaje) en coordinación intersectorial.</li>
            <li>Contribuir a la reducción de la Desnutrición Crónica Infantil (DCI) y la Anemia.</li>
          </ul>
        </section>

        {/* Modalidades de Intervención */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">3.4. Modalidades de Intervención</h2>

          <p className="text-gray-700 mb-4">
            Cuna Más opera con dos modalidades que se adaptan al contexto local: 
            <strong> Servicio de Cuidado Diurno (SCD)</strong> y <strong>Servicio de Acompañamiento a Familias (SAF)</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            {/* SCD Card */}
            <div className="bg-white border p-5 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">a) Servicio de Cuidado Diurno (SCD)</h3>

              <p className="text-gray-700 mb-3">
                Modelo similar a una guardería pública: centros infantiles (CIAI) que atienden de lunes a viernes,
                8 horas al día.
              </p>

              <ul className="text-gray-700 space-y-2 mb-3">
                <li><strong>¿Cómo funciona?</strong> Asistencia diaria en Centros Infantiles de Atención Integral (CIAI).</li>
                <li><strong>¿Quién cuida?</strong> Madres Cuidadoras —actoras comunales voluntarias—, capacitadas y supervisadas por personal técnico del PNCM.</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="font-semibold mb-2">Componente Anemia / Nutrición (Directo)</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Alimentación completa:</strong> tres comidas al día (refrigerio mañana, almuerzo, refrigerio tarde).</li>
                  <li><strong>Rico en hierro:</strong> comidas diseñadas para cubrir ~70% de necesidades calóricas y nutrientes, priorizando alimentos ricos en hierro (sangrecita, hígado, pescado, carnes).</li>
                  <li><strong>Seguimiento:</strong> monitoreo de peso, talla y hemoglobina en coordinación con el centro de salud local.</li>
                </ul>
              </div>
            </div>

            {/* SAF Card */}
            <div className="bg-white border p-5 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">b) Servicio de Acompañamiento a Familias (SAF)</h3>

              <p className="text-gray-700 mb-3">
                Modalidad basada en visitas domiciliarias y sesiones grupales —muy útil en zonas rurales o dispersas—.
              </p>

              <ul className="text-gray-700 space-y-2 mb-3">
                <li><strong>¿Cómo funciona?</strong> Facilitadores visitan el hogar del niño y la familia para ofrecer consejería práctica.</li>
                <li><strong>Frecuencia:</strong> visita semanal (~1 hora) y sesiones grupales mensuales para socialización y aprendizaje colectivo.</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold mb-2">Componente Anemia / Nutrición (Consejería)</h4>
                <p className="text-gray-700 mb-2">En las visitas se enseña y modela prácticas de cuidado nutricional y prevención de anemia:</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Consejería directa:</strong> demostraciones prácticas de preparación de comidas ricas en hierro.</li>
                  <li><strong>Suplementación:</strong> importancia de micronutrientes (gotas, Nutri-Hierro) y cuándo administrarlos.</li>
                  <li><strong>Identificación de signos:</strong> enseñar a reconocer señales de alarma para búsqueda de atención.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Temas clave SAF (separado para claridad) */}
          <div className="mt-6 bg-blue-50 p-4 rounded-xl">
            <h4 className="font-semibold mb-2">Temas clave en SAF</h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Nutrición y anemia:</strong> recetas ricas en hierro, demostraciones y suplementación.</li>
              <li><strong>Higiene:</strong> lavado de manos, consumo de agua segura para prevenir diarreas y parasitosis.</li>
              <li><strong>Salud:</strong> cumplimiento del calendario de vacunas y asistencia al CRED para tamizaje y tratamiento.</li>
              <li><strong>Aprendizaje:</strong> actividades de estimulación con materiales locales, juego y comunicación para desarrollo cerebral.</li>
            </ul>
          </div>
        </section>

        {/* Relevancia y Sinergias */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">3.5. Relevancia y Sinergias</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
                El estudio del PNCM, y en particular del SAF, es crucial para diseñar tu app porque:
            </p>

            <ol className="list-decimal pl-6 text-gray-700 space-y-3">
                <li>
                <strong>Contenido validado:</strong> el SAF ya tiene un paquete de consejería estructurado y validado por el Estado —tu app puede digitalizar y reforzar este contenido sin "inventar" mensajes nuevos.
                </li>

                <li>
                <strong>Modelo de entrega:</strong> las visitas semanales permiten que la app actúe como un "facilitador digital" entre visitas, reforzando mensajes y alcanzando familias no cubiertas.
                </li>

                <li>
                <strong>Enfoque en la práctica:</strong> SAF enfatiza "cómo hacerlo" (demostraciones culinarias). La app puede usar videos cortos, pasos ilustrados y checklists para replicar esas demostraciones.
                </li>

                <li>
                <strong>Articulación con salud:</strong> Cuna Más complementa al centro de salud; la app debe siempre dirigir al usuario al CRED para diagnóstico y tratamiento médico.
                </li>

                <li>
                <strong>Población coincidente:</strong> la app y SAF compiten por la atención del mismo usuario: padres/cuidadores de bebés 6–12 meses en situación vulnerable; por eso la información debe ser clara, práctica y accesible.
                </li>
            </ol>

            {/* Video */}
            <div className="mt-6">
                <iframe
                className="w-full h-64 md:h-96 rounded-xl shadow-md"
                src="https://www.youtube.com/embed/aXjIVtZX9Ls"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
        </section>

        {/* Más información y recursos (opcional) */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Más información</h2>



        <ul className="space-y-4 text-gray-700">

            {/* Enlace 1 */}
            <li className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
                <a
                href="https://www.facebook.com/MidisCunaMas/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-700 hover:underline"
                >
                👉 Página oficial de Cuna Más (Facebook)
                </a>
                <p className="text-sm mt-1 text-gray-600">
                Publicaciones, campañas e información oficial del programa.
                </p>
            </li>

            {/* Enlace 2 */}
            <li className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
                <a
                href="https://www.gob.pe/cunamas"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-700 hover:underline"
                >
                👉 Portal del Programa Nacional Cuna Más (Gob.pe)
                </a>
                <p className="text-sm mt-1 text-gray-600">
                Documentos normativos, servicios, lineamientos y noticias del PNCM.
                </p>
            </li>

            {/* Enlace 3 */}
            <li className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
                <a
                href="https://www.congreso.gob.pe/Docs/comisiones2021/CEM-proteccion-infancia-emergencia-/files/sed-13-exposici%C3%93n-03-minsa-05-12-2023.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-700 hover:underline"
                >
                👉 Documento técnico MINSA sobre infancia (PDF)
                </a>
                <p className="text-sm mt-1 text-gray-600">
                Presentación oficial del MINSA sobre protección infantil y lineamientos recientes.
                </p>
            </li>

            </ul>

        </section>


        {/* Botón volver */}
        <div className="text-center mt-6 pb-10">
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
