import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";

import OrderItem from "../../components/order/OrderItem";

import "./OrderHistory.scss";

const OrderHistory = () => {
  const { cart, checked, toggleAllChecked, toggleItemChecked, productTotal } =
    useContext(CartContext);

  const [deliveryCharge, setDeliveryCharge] = useState(3000);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setDeliveryCharge(productTotal >= 20000 ? 0 : 3000);
  }, [productTotal]);

  useEffect(() => {
    setTotalPrice(productTotal + deliveryCharge);
  }, [productTotal, deliveryCharge]);

  return (
    <div className="orderHistory">
      <div className="wrapper">
        <div className="orderProcess">
          <div className="stepOne">
            <div className="step">1</div>
            <span>장바구니</span>
          </div>

          <div className="stepTwo">
            <div className="step">2</div>
            <span>주문완료</span>
          </div>
        </div>

        <div className="orderHeader">
          <div className="headerDate">2023.07.12</div>
          <div className="headerNumber">02701211456</div>
        </div>

        <div className="order">
          <div className="orderTitle">배송</div>
        </div>

        <div className="deliveryInfo">
          <div className="deliveryTitle">상품준비중</div>
          <div className="deliveryDate">2023.07.12</div>
          <div className="deliveryStatus">도착예정</div>
        </div>

        <ul className="orderItems">
          {cart.map((item) => (
            <OrderItem item={item} key={item.id} />
          ))}
        </ul>

        <div className="order">
          <div className="orderTitle">배송정보</div>
        </div>

        <div className="delivery">
          <div className="deliveryTitle">
            윤서영 / 01026476004
            <br /> [04092] 서울특별시 마포구 신수로 15 (현석동, 강변힐스테이트),
            107동 901호
          </div>
        </div>

        <div className="order">
          <div className="orderTitle">결제정보</div>
        </div>

        <div className="deliveryPrice">
          <div className="price">주문금액</div>
          <div className="price">19,800원</div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
