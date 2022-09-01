import { useContext } from "react";
import { ReactComponent as ShopIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-icon-container">
      <ShopIcon className="shopping-icon" onClick={toggleCartOpen} />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
