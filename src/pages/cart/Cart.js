import React, { useState, useContext, useEffect } from "react";
import { saveOrderToFirebase } from "../../utils/order";
import { CartContext } from "../../contexts/CartContext";

import CartList from "../../components/cart/CartList";
import OrderModal from "../../components/modal/orderModal/OrderModal";

import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";

import "./Cart.scss";

const Cart = () => {
  const { cart, checked, toggleAllChecked, toggleItemChecked, productTotal } =
    useContext(CartContext);

  console.log("카트데이터", cart);

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

  const handleCheck = () => {
    toggleAllChecked();
  };

  return (
    <div className="cart">
      <div className="wrapper">
        <div className="productAll">
          <div className="product" onClick={handleCheck}>
            {checked ? (
              <AiFillCheckCircle className="checkIcon" />
            ) : (
              <AiOutlineCheckCircle className="checkIcon" />
            )}
            전체
          </div>

          <div className="orderProcess">
            <div className="stepOne">
              <div className="step">1</div>
              <span>장바구니</span>
            </div>
            <div className="stepTwo">
              <div className="step">2</div>
              <span>주문 / 결제</span>
            </div>
            <div className="stepThree">
              <div className="step">3</div>
              <span>주문완료</span>
            </div>
          </div>
        </div>
        <ul className="cartLists">
          {cart.map((item) => (
            <CartList
              item={item}
              key={item.id}
              toggleItemChecked={toggleItemChecked}
            />
          ))}
        </ul>
        <div className="priceBlock">
          <div className="blockTitle">총 결제금액</div>
          <div className="productPrice">
            <div className="priceContext">상품금액</div>
            <div className="price">{productTotal.toLocaleString()}원</div>
          </div>
          <div className="deliveryCharge">
            <div className="priceContext">배송비</div>
            <div className="price">{`+ ${deliveryCharge.toLocaleString()}원`}</div>
          </div>
          <div className="totalPrice">
            <div className="priceContext">결제예정금액</div>
            <div className="price">{totalPrice.toLocaleString()}원</div>
          </div>
        </div>
      </div>
      <OrderModal saveOrder={() => saveOrderToFirebase(cart)} />
    </div>
  );
};

export default Cart;
