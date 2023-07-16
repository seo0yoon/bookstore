import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { saveOrderToFirebase } from "../../utils/order";
import { CartContext } from "../../contexts/CartContext";
import { getAuth } from "firebase/auth";

import CartList from "../../components/cart/CartList";
import OrderModal from "../../components/modal/orderModal/OrderModal";

import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiFillInfoCircle,
} from "react-icons/ai";

import "./Cart.scss";

const Cart = () => {
  const {
    cart,
    checked,
    toggleAllChecked,
    toggleItemChecked,
    productTotal,
    clearSelectedItems,
  } = useContext(CartContext);

  const [deliveryCharge, setDeliveryCharge] = useState(3000);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setDeliveryCharge(productTotal >= 20000 ? 0 : 3000);
  }, [productTotal]);

  useEffect(() => {
    setTotalPrice(productTotal + deliveryCharge);
  }, [productTotal, deliveryCharge]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const completeOrder = async () => {
    const selectedItems = cart.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      return false;
    }

    const result = await saveOrderToFirebase(selectedItems, userId);
    if (result) {
      clearSelectedItems();
      return true;
    }
    return false;
  };

  return (
    <div className="cart">
      <div className="wrapper">
        <div className="productAll">
          <div className="product" onClick={toggleAllChecked}>
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

            <div className="stepThree">
              <div className="step">2</div>
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
        {cart.length > 0 ? (
          <div className="priceWrap">
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
        ) : (
          <div className="emptyCart">
            <AiFillInfoCircle className="infoIcon" />
            <span>장바구니에 담긴 상품이 없습니다.</span>
            {userId === null ? (
              <Link to={"/login"}>
                <button className="loginBtn">로그인</button>
              </Link>
            ) : null}
          </div>
        )}
      </div>
      <OrderModal
        saveOrder={completeOrder}
        disabledButton={cart.length > 0 ? false : true}
      />
    </div>
  );
};

export default Cart;
