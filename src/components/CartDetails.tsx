// import React from "react";
// import { useCart } from "../context/CartProvider";
// import { FaTrash } from "react-icons/fa"; // Ikon för att ta bort produkter
// import "../styles/CartDetails.css"; // Importera CSS-filen för cart details

// const CartDetails: React.FC = () => {
//   const { cart, removeFromCart, clearCart } = useCart();

//   return (
//     <div className="cart-details">
//       <h2>Din kundvagn</h2>
//       {cart.length === 0 ? (
//         <p>Kundvagnen är tom.</p>
//       ) : (
//         <div>
//           {cart.map((item) => (
//             <div key={item.id} className="cart-item">
//               <p>{item.name}</p>
//               <p>Pris: {item.price} SEK</p>
//               <p>Antal: {item.quantity}</p>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="remove-button"
//               >
//                 <FaTrash /> Ta bort
//               </button>
//             </div>
//           ))}
//           <button onClick={clearCart} className="clear-cart-button">
//             Töm kundvagnen
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartDetails;
import React from "react";
import { useCart } from "../context/CartProvider";
import { FaTrash } from "react-icons/fa"; // Ikon för att ta bort produkter
import "../styles/CartDetails.css"; // Importera CSS-filen för cart details

const CartDetails: React.FC = () => {
  const { cart, removeOneFromCart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-details">
      <h2>Din kundvagn</h2>
      {cart.length === 0 ? (
        <p>Kundvagnen är tom.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name}</p>
              <p>Pris: {item.price} SEK</p>
              <p>Antal: {item.quantity}</p>
              <button
                onClick={() => removeOneFromCart(item.id)}
                className="remove-one-button"
              >
                Ta bort en
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
              >
                <FaTrash /> Ta bort alla
              </button>
            </div>
          ))}
          <button onClick={clearCart} className="clear-cart-button">
            Töm kundvagnen
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
