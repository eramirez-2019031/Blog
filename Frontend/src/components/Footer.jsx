import React, { useState } from 'react';
import './styles/Footer.css';
import { Formulario } from './Formulario'; // Asegúrate de importar el componente Formulario

export const Footer = () => {
  const [showFormulario, setShowFormulario] = useState(false);

  // Función para mostrar el formulario
  const handleShowFormulario = () => {
    setShowFormulario(true);
  };

  // Renderizado condicional para mostrar el formulario si showFormulario es true
  if (showFormulario) {
    return <Formulario />;
  }

  return (
    <footer className="footer">
      <div className="container">
        <p>Dejanos tu comentario para mejorar</p>
        <div>
          <button className="btn" onClick={handleShowFormulario}>Dejar comentario</button>
          <button className="btn">Ver comentarios</button>
        </div>
      </div>
    </footer>
  );
};
