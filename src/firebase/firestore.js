import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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

export const getBestsellerBooks = async () => {
  const booksRef = collection(db, "bestseller");
  const booksSnapshot = await getDocs(booksRef);
  const booksList = booksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return booksList;
};

export const getNewBooks = async () => {
  const booksRef = collection(db, "newbooks");
  const booksSnapshot = await getDocs(booksRef);
  const booksList = booksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return booksList;
};

export const addBook = async (book) => {
  const booksRef = collection(db, "books");
  await addDoc(booksRef, book);
};

export const updateBook = async (book) => {
  const bookRef = doc(db, "books", book.id);
  await updateDoc(bookRef, {
    title: book.title,
    author: book.author,
    price: book.price,
    publicationDate: book.publicationDate,
  });
};

export const deleteBook = async (bookId) => {
  const bookRef = doc(db, "books", bookId);
  await deleteDoc(bookRef);
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
