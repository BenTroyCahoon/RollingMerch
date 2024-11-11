import React from "react";
import { useCart } from "../context/CartProvider";
import { FaShoppingCart } from "react-icons/fa"; // Du kan använda vilken ikon du vill

const CartIcon: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="cart-icon" onClick={() => alert("Visa kundvagn här!")}>
      <FaShoppingCart size={30} />
      <span className="cart-count">{cart.length}</span>
    </div>
  );
};

export default CartIcon;
