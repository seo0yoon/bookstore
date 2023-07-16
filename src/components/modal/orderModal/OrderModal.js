import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./OrderModal.scss";

const OrderModal = ({ saveOrder, disabledButton }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOrder = async () => {
    const result = await saveOrder();
    if (result) {
      setShowModal(true);
    }
  };

  return (
    <section className="orderModal">
      <button
        className="checkOutBtn"
        onClick={handleOrder}
        disabled={disabledButton}
      >
        주문하기
      </button>
      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>
              주문이 완료되었습니다. <br />
              주문내역을 확인하시겠습니까?{" "}
            </h2>
            <div className="btnBox">
              <button className="closeBtn" onClick={() => setShowModal(false)}>
                취소
              </button>
              <Link to={"/orderhistory"}>
                <button className="goToBtn" onClick={() => setShowModal(false)}>
                  확인
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderModal;
