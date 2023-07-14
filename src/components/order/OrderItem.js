import React from "react";

import "./OrderItem.scss";

const OrderItem = ({ item }) => {
  return (
    <li className="orderItem" key={item.id}>
      <div className="productBox">
        <img className="productImg" src={item.imageURL} alt="book" />
        <div className="productInfoBox">
          <div className="deliveryBadge">비비문고 배송</div>
          <div className="productTitle">{item.title}</div>
          <div className="productQuantity">
            <span>수량 : </span>
            <span>{item.quantity}</span>
          </div>
          <div className="productPrice">
            <span>{item.price}원</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
