import React, { useState, useContext } from "react";

import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

import { CartContext } from "../../contexts/CartContext";

import "./OrderItem.scss";

const OrderItem = ({ item }) => {
  return (
    <li className="orderItem">
      <div className="infoMain">
        <div className="productBox">
          <img className="productImg" src={item.imageURL} alt="" />

          <div className="productInfoBox">
            <div className="deliveryBadge">비비문고 배송</div>
            <div className="productTitle">
              [국내도서] 프론트엔드 성능 최적화 가이드
            </div>
            <div className="productQuantity">
              <span>수량 : </span>
              <span>1</span>
            </div>

            <div className="productPrice">
              <span>19,800원 </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
