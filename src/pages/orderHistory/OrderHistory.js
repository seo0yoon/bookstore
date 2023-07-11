import React, { useState, useEffect } from "react";

import { getOrders } from "../../firebase/firestore";
import OrderItem from "../../components/order/OrderItem";

import "./OrderHistory.scss";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersList = await getOrders();
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

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
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="orderContainer" key={order.id}>
              <div className="orderHeader">
                <div className="headerDate">
                  {new Date(
                    order.orderedAt.seconds * 1000
                  ).toLocaleDateString()}
                </div>
                <div className="headerNumber">{order.id}</div>
              </div>
              <div className="order">
                <div className="orderTitle">배송</div>
              </div>
              <div className="deliveryInfo">
                <div className="deliveryTitle">상품준비중</div>
                <div className="deliveryDate">
                  {new Date(
                    order.orderedAt.seconds * 1000 + 2 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </div>
                <div className="deliveryStatus">도착예정</div>
              </div>
              <ul className="orderItems">
                {order.items.map((item) => (
                  <OrderItem item={item} key={item.id} />
                ))}
              </ul>
              <div className="order">
                <div className="orderTitle">배송정보</div>
              </div>
              <div className="delivery">
                <div className="deliveryTitle">
                  윤서영 / 01026476004
                  <br /> [04092] 서울특별시 마포구 신수로 15 (현석동,
                  강변힐스테이트),
                </div>
              </div>
              <div className="deliveryPrice">
                <div className="price">주문금액</div>
                <div className="price">
                  {order.totalPrice.toLocaleString()}원
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="orderContainer">
            <div className="orderHeader">주문내역이 없습니다.</div>
            <div className="order">
              <div className="orderTitle">배송</div>
            </div>
            <ul className="orderItems"></ul>
            <div className="order">
              <div className="orderTitle">배송정보</div>
            </div>
            <div className="deliveryPrice">
              <div className="price">주문금액</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
