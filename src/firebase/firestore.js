import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNRIp_To5zF5Atz3cyxtzwlU7qt8UaRmg",
  authDomain: "myauth-d1c4a.firebaseapp.com",
  projectId: "myauth-d1c4a",
  storageBucket: "myauth-d1c4a.appspot.com",
  messagingSenderId: "98717961979",
  appId: "1:98717961979:web:258cccbce6b985cb702a5e",
  measurementId: "G-TF7NBQZR36",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getBooks = async () => {
  const booksRef = collection(db, "books");
  const booksSnapshot = await getDocs(booksRef);
  const booksList = booksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return booksList;
};

export const getOrders = async () => {
  const ordersRef = collection(db, "orders");
  const ordersSnapshot = await getDocs(ordersRef);
  const ordersList = ordersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return ordersList;
};

export default db;
