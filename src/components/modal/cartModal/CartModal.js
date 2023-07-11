import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BsCart2 } from "react-icons/bs";

import "./CartModal.scss";

const CartModal = ({ message }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="cartModal">
      <div className="checkOutBtn" onClick={() => setShowModal(true)}>
        장바구니
      </div>
      <BsCart2 className="cartIcon" />
      {showModal && (
        <div className="modalOverlay" onClick={handleClose}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>
              {message}
              <br /> 장바구니로 이동하시겠습니까?
            </h2>
            <div className="btnBox">
              <button className="closeBtn" onClick={handleClose}>
                취소
              </button>
              <Link to={"/cart"}>
                <button className="goToBtn" onClick={handleConfirm}>
                  확인
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
