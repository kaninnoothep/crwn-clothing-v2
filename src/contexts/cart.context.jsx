import { createContext, useEffect, useState } from "react";

export const itemToAdd = (cartItems, productToAdd) => {
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

// NOTE Function to REMOVE or CLEAR Item from cartItems (return new cartItems)
export const itemToRemove = (cartItems, productToRemove, clear = false) => {
  // if it exist -> -1 quantity
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  // if quantity === 1 || clear parameter is set -> remove from the cart
  if (existingCartItem.quantity === 1 || clear === true) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  // return back cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const calculateTotalPrice = () => {};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // NOTE Use Reduce method to sum the total product
  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(count);
  }, [cartItems]);

  // NOTE Calculate Total Price in Cart
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  // NOTE Method to add Item to Cart
  const addItemToCart = (product) => {
    setCartItems(itemToAdd(cartItems, product));
  };

  const decreaseItemFromCart = (productToRemove) => {
    setCartItems(itemToRemove(cartItems, productToRemove));
  };
  const clearItemFromCart = (productToRemove) => {
    setCartItems(itemToRemove(cartItems, productToRemove, true));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    decreaseItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
