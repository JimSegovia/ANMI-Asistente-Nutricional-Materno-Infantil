import React from "react";

export default function MenuItem({ icon, title, description, type }) {
  const mostrarSeccion = () => {
    alert(
      `Sección "${title.toUpperCase()}" en desarrollo.\n\nEsta funcionalidad estará disponible en las próximas semanas del proyecto.`
    );
  };
}
