import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [checked, setChecked] = useState(true);
  const [productTotal, setProductTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => (item.selected ? acc + item.price * item.quantity : acc),
      0
    );
    setProductTotal(total);
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (itemIndex === -1) {
        return [...prevCart, { ...item, quantity: 1, selected: true }];
      } else {
        return prevCart.map((cartItem, index) =>
          index === itemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const isPlus = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const isMinus = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", "[]");
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const toggleItemChecked = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAllChecked = () => {
    setChecked(!checked);
    const updatedCart = cart.map((item) => ({
      ...item,
      selected: !checked,
    }));
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        checked,
        addToCart,
        removeFromCart,
        isPlus,
        isMinus,
        updateCart,
        toggleAllChecked,
        toggleItemChecked,
        productTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
