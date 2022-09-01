import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <div>
          <span>name</span>
          <span>4 x $price</span>
        </div>
      </div>
      <Button>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
