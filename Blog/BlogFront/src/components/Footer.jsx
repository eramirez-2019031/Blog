import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

export const Footer = ({ isOpen }) => {
    return (
        <div className="big-footer">
            {/* Mostrar el botón 'Crear publicación' solo si el menú está cerrado */}
            {!isOpen && (
                <div className="create-post-btn">
                    <Link to="/add">
                        <button>Crear nueva publicación</button>
                    </Link>
                </div>
            )}
        </div>
    );
};
