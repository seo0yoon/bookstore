import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase/firestore";

export const saveOrderToFirebase = async (items, userId) => {
  try {
    const ordersRef = collection(db, "orders");
    const totalPrice = items.reduce(
      (total, item) => total + parseInt(item.price) * item.quantity,
      0
    );
    const newOrder = {
      items: items,
      orderedAt: serverTimestamp(),
      totalPrice: totalPrice,
      userId: userId,
    };
    const orderRef = await addDoc(ordersRef, newOrder);
    console.log("주문완료 id: ", orderRef.id);
    return true;
  } catch (error) {
    console.error("주문완료를 실패하였습니다.: ", error);
    return false;
  }
};
