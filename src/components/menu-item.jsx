import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ icon, title, description, type }) {
  const contenidoDeLaTarjeta = (
    <div> 
      <img src={icon} alt={title}/>
      <h3 className="menu-item-title">{title}</h3>
      <p className="menu-item-description">{description}</p>
    </div>
  );

  if (title === "Chatbot ANMI") {
    return (
      <Link to="/chatbot">
        {contenidoDeLaTarjeta}
      </Link>
    );
  } else {
    return (
      <div>
        {contenidoDeLaTarjeta}
      </div>
    );
  }
}
