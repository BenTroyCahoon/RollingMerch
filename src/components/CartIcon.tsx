// import React, { useState } from "react";
// import { useCart } from "../context/CartProvider";
// import { FaShoppingCart } from "react-icons/fa";
// import CartModal from "./CartModal";
// import "../styles/CartIcon.css";

// const CartIcon: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const { cart } = useCart();

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="cart-icon-container">
//       <button className="cart-icon-button" onClick={handleOpenModal}>
//         <FaShoppingCart />
//         {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
//       </button>
//       {isModalOpen && <CartModal onClose={handleCloseModal} />}
//     </div>
//   );
// };

// export default CartIcon;
import React, { useState } from "react";
import { useCart } from "../context/CartProvider";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";
import "../styles/CartIcon.css";

const CartIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { cart } = useCart();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart-icon-container">
      <button className="cart-icon-button" onClick={handleOpenModal}>
        <FaShoppingCart />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </button>
      {isModalOpen && <CartModal onClose={handleCloseModal} />}
    </div>
  );
};

export default CartIcon;
