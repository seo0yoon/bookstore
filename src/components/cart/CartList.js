import React, { useState, useEffect, useContext } from "react";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineClose,
} from "react-icons/ai";

import { CartContext } from "../../contexts/CartContext";
import "./CartList.scss";

const CartList = ({ item, toggleItemChecked }) => {
  const { isPlus, isMinus, removeFromCart } = useContext(CartContext);

  const [itemTotal, setItemTotal] = useState(0);

  useEffect(() => {
    const total = item.price * item.quantity;
    setItemTotal(total);
  }, [item.quantity, item.price]);

  const handleItemCheck = () => {
    toggleItemChecked(item.id);
  };

  return (
    <li className="cartList">
      <div className="infoMain">
        <div className="infoProduct">
          <h3 className="productName" onClick={handleItemCheck}>
            {item.selected ? (
              <AiFillCheckCircle className="checkIcon" />
            ) : (
              <AiOutlineCheckCircle className="checkIcon" />
            )}
            {item.title}
          </h3>
          <AiOutlineClose
            className="closeIcon"
            onClick={() => removeFromCart(item.id)}
          />
        </div>
        <section className="productPriceBox">
          <img className="productImg" src={item.imageURL} alt="" />
          <div className="sale">10%</div>
          <div className="salePrice">{itemTotal.toLocaleString()}원</div>
        </section>
        <section className="productQuantity">
          <div className="minusQuantity" onClick={() => isMinus(item.id)}>
            <AiOutlineMinus />
          </div>
          <input
            type="text"
            value={item.quantity}
            className="currentQuantity"
            readOnly
          />
          <div className="plusQuantity" onClick={() => isPlus(item.id)}>
            <AiOutlinePlus />
          </div>
        </section>
      </div>
      <div className="listBottom">
        <select className="selectCoupon">
          <option value="option1">회원가입 축하 10% 쿠폰</option>
          <option value="option2">회원가입 축하 10% 쿠폰</option>
          <option value="option3">회원가입 축하 10% 쿠폰</option>
        </select>
      </div>
    </li>
  );
};

export default CartList;
