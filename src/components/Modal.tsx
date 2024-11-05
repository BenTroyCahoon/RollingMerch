// import React from "react";
// import "../styles/Modal.css";

// interface ModalProps {
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React from "react";
import "../styles/Modal.css";

interface ModalProps {
  onClose: () => void;
  productId: number; // Lägg till denna rad för att inkludera productId
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, productId, children }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Produkt ID: {productId}</h2>{" "}
        {/* Exempel på hur du kan använda productId */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
