import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../../contexts/CartContext";

import "./Modal.scss";

const Modal = ({ children, closeModal }) => {
  const { modalOpen } = useContext(CartContext);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    if (modalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalOpen]);

  const handleCloseClick = (e) => {
    e.preventDefault();
    closeModal();
  };

  const modalContent = modalOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-close" onClick={handleCloseClick}>
          &times;
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return createPortal(modalContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
};

export default Modal;
