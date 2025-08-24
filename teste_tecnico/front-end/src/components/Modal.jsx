import React from 'react';
import './Modal.css'; 

// Componente de modal simples usado para exibir conteúdo sobre a tela principal.
// Recebe: isOpen (controla se aparece), onClose (fecha o modal) e children (conteúdo dentro do modal).

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;