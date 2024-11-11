// import React from "react";
// import "../styles/Modal.css";
// import CartDetails from "./CartDetails";
// import "../styles/CartModal.css";

// interface CartModalProps {
//   onClose: () => void;
// }

// const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <CartDetails />
//       </div>
//     </div>
//   );
// };

// export default CartModal;
import React from "react";
import "../styles/Modal.css";
import CartDetails from "./CartDetails";
import "../styles/CartModal.css";

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <CartDetails />
      </div>
    </div>
  );
};

export default CartModal;
