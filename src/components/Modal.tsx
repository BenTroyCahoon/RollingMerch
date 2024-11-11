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
// import React from "react";
// import "../styles/Modal.css";
// import { useCart } from "../context/CartProvider";

// interface ModalProps {
//   onClose: () => void;
//   productId: number; // Lägg till denna rad för att inkludera productId
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ onClose, productId, children }) => {
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <h2>Produkt ID: {productId}</h2>{" "}
//         {/* Exempel på hur du kan använda productId */}
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
// import React from "react";
// import "../styles/Modal.css";
// import { useCart } from "../context/CartProvider";
// import { useAuth } from "../context/useAuth"; // Lägg till denna import

// interface ModalProps {
//   onClose: () => void;
//   productId: number;
//   product: {
//     id: number;
//     name: string;
//     description: string;
//     imageUrl: string;
//     year: number;
//     price: number;
//     stock: number;
//   };
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ onClose, product, children }) => {
//   const { addToCart } = useCart();
//   const { user } = useAuth(); // Få tillgång till användarinformation

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <h2>{product.name}</h2>
//         <p>{product.description}</p>
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="product-image"
//         />
//         <p>År: {product.year}</p>
//         <p>Pris: {product.price} SEK</p>
//         <p>Antal i lager: {product.stock}</p>

//         {/* Bara visa knappen om användaren är en vanlig användare */}
//         {user?.access_level === 1 && (
//           <button
//             onClick={() => {
//               addToCart(product);
//               alert(`${product.name} lades till i kundkorgen`);
//             }}
//           >
//             Lägg till i kundkorgen
//           </button>
//         )}

//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
// import React from "react";
// import "../styles/Modal.css";
// import { useCart } from "../context/CartProvider";
// import { useAuth } from "../context/useAuth";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   year: number;
//   price: number;
//   stock: number;
// }

// interface ModalProps {
//   onClose: () => void;
//   product: Product; // Uppdatera till att använda hela produkt-objektet
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ onClose, product, children }) => {
//   const { addToCart } = useCart();
//   const { user } = useAuth();

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <h2>{product.name}</h2>
//         <p>{product.description}</p>
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="product-image"
//         />
//         <p>År: {product.year}</p>
//         <p>Pris: {product.price} SEK</p>
//         <p>Antal i lager: {product.stock}</p>

//         {/* Bara visa knappen om användaren är en vanlig användare */}
//         {user?.access_level === 1 && (
//           <button
//             onClick={() => {
//               addToCart(product);
//               alert(`${product.name} lades till i kundkorgen`);
//             }}
//           >
//             Lägg till i kundkorgen
//           </button>
//         )}

//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
// import React from "react";
// import { useCart } from "../context/CartProvider";
// import "../styles/Modal.css";

// interface ModalProps {
//   onClose: () => void;
//   product: {
//     id: number;
//     name: string;
//     price: number;
//     imageUrl: string;
//     description: string;
//     stock: number;
//   };
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ onClose, product, children }) => {
//   const { addToCart } = useCart();

//   const handleAddToCart = () => {
//     addToCart(product);
//   };

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//         <div className="product-modal-content">
//           <img src={product.imageUrl} alt={product.name} />
//           <h2>{product.name}</h2>
//           <p>{product.description}</p>
//           <p>Pris: {product.price} SEK</p>
//           <button onClick={handleAddToCart} className="add-to-cart-button">
//             Lägg till i kundvagnen
//           </button>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React, { useState } from "react";
import { useCart } from "../context/CartProvider";
import ProductReviewsList from "./ProductReveiwList";
import ProductReviewForm from "./ProductReviewForm";
import { useAuth } from "../context/useAuth";
import "../styles/Modal.css";

interface ModalProps {
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    stock: number;
  };
}

const Modal: React.FC<ModalProps> = ({ onClose, product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  // State för att hålla koll på lagerstatusen lokalt
  const [currentStock, setCurrentStock] = useState<number>(product.stock);

  const handleAddToCart = () => {
    if (currentStock > 0) {
      addToCart(product);
      setCurrentStock(currentStock - 1);
    } else {
      alert("Produkten är slut i lager.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="product-modal-content">
          {/* Produktinformation */}
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Pris: {product.price} SEK</p>
          <p>
            Lagerstatus:{" "}
            {currentStock > 0 ? `${currentStock} i lager` : "Slut i lager"}
          </p>

          {/* Lägg till i kundvagnen-knapp */}
          {currentStock > 0 && (
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Lägg till i kundvagnen
            </button>
          )}

          {/* Produktrecensioner */}
          <div className="reviews-section">
            <h3>Recensioner:</h3>
            <ProductReviewsList productId={product.id} />
          </div>

          {/* Recensionsformulär, endast för användare med access_level 1 */}
          {user?.access_level === 1 && (
            <div className="review-form-section">
              <h3>Skriv en recension:</h3>
              <ProductReviewForm productId={product.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
