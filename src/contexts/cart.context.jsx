import { createContext, useState } from "react";

export const newCartItems = (cartItems, productToAdd) => {
  // ANCHOR if it exitst -> return object that add product to existing object
  // NOTE Find an exist item in cartItems
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    // NOTE map existing item with quantity +1 -> return new array
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // ANCHOR if it NOT -> return object with new product
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // NOTE Method to add Item to Cart
  const addItemToCart = (product) => {
    setCartItems(newCartItems(cartItems, product));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
