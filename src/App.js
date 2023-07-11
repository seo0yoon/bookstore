import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext"; // 임포트 추가

import Main from "./pages/main/Main";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import BookList from "./pages/bookList/BookList";
import Footer from "./components/footer/Footer";
import Admin from "./pages/admin/Admin";
import Cart from "./pages/cart/Cart";
import OrderHistory from "./pages/orderHistory/OrderHistory";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
