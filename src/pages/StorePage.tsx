// import React, { useEffect } from "react";
// import LogoutButton from "../components/LogoutButton";
// import LoginButton from "../components/LoginButton";
// import ProductList from "../components/ProductList";
// import ReviewList from "../components/ReviewList";
// import { useAuth } from "../context/useAuth";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import "../styles/PageLayout.css";
// import "../styles/ProductList.css";
// import "../styles/GreenTheme.css";

// const StorePage: React.FC = () => {
//   const { isLoggedIn, setIsLoggedIn, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       setTimeout(() => {
//         const token = Cookies.get("token");

//         if (token) {
//           console.log("Token hittades, användare är inloggad.");
//           setIsLoggedIn(true);
//         } else {
//           console.log("Ingen token hittades, användare är inte inloggad.");
//           setIsLoggedIn(false);
//         }
//       }, 500);
//     };

//     checkLoginStatus();
//   }, [setIsLoggedIn]);

//   const handleAdminPageClick = () => {
//     navigate("/adminpage");
//   };

//   return (
//     <div className="page-layout">
//       {isLoggedIn ? <LogoutButton /> : <LoginButton />}
//       {isLoggedIn && user?.access_level === 2 && (
//         <button onClick={handleAdminPageClick} className="admin-button">
//           Adminpanel
//         </button>
//       )}
//       <div className="page-content">
//         <h1 className="page-title">HÄR ÄR AFFÄREN!</h1>
//         <ProductList />
//         <ReviewList />
//         <button className="review-button" onClick={() => navigate("/review")}>
//           Lämna en recension
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StorePage;
// import React, { useEffect, useState } from "react";
// import LogoutButton from "../components/LogoutButton";
// import LoginButton from "../components/LoginButton";
// import ProductList from "../components/ProductList";
// import ReviewList from "../components/ReviewList";
// import Modal from "../components/Modal";
// import ProductReviewsList from "../components/ProductReveiwList";
// import { useAuth } from "../context/useAuth";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import "../styles/PageLayout.css";
// import "../styles/ProductList.css";
// import "../styles/GreenTheme.css";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   year: number;
//   price: number;
// }

// const StorePage: React.FC = () => {
//   const { isLoggedIn, setIsLoggedIn, user } = useAuth();
//   const navigate = useNavigate();
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       setTimeout(() => {
//         const token = Cookies.get("token");

//         if (token) {
//           console.log("Token hittades, användare är inloggad.");
//           setIsLoggedIn(true);
//         } else {
//           console.log("Ingen token hittades, användare är inte inloggad.");
//           setIsLoggedIn(false);
//         }
//       }, 500);
//     };

//     checkLoginStatus();
//   }, [setIsLoggedIn]);

//   const handleAdminPageClick = () => {
//     navigate("/adminpage");
//   };

//   const handleProductClick = (product: Product) => {
//     setSelectedProduct(product);
//   };

//   const handleModalClose = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="page-layout">
//       {isLoggedIn ? <LogoutButton /> : <LoginButton />}
//       {isLoggedIn && user?.access_level === 2 && (
//         <button onClick={handleAdminPageClick} className="admin-button">
//           Adminpanel
//         </button>
//       )}
//       <div className="page-content">
//         <h1 className="page-title">HÄR ÄR AFFÄREN!</h1>
//         <ProductList onProductClick={handleProductClick} />{" "}
//         {/* Uppdatera för att skicka med klickhanterare */}
//         <ReviewList />
//         <button className="review-button" onClick={() => navigate("/review")}>
//           Lämna en recension
//         </button>
//       </div>

//       {/* Modal för att visa produktinformation och recensioner */}
//       {selectedProduct && (
//         <Modal onClose={handleModalClose} productId={selectedProduct.id}>
//           <div className="product-details">
//             <h2>{selectedProduct.name}</h2>
//             <p>{selectedProduct.description}</p>
//             <img
//               src={selectedProduct.imageUrl}
//               alt={selectedProduct.name}
//               className="product-image"
//             />
//             <p>År: {selectedProduct.year}</p>
//             <p>Pris: {selectedProduct.price} SEK</p>
//             {/* Lägg till produktrecensioner */}
//             <ProductReviewsList productId={selectedProduct.id} />
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default StorePage;
// import React, { useEffect, useState } from "react";
// import LogoutButton from "../components/LogoutButton";
// import LoginButton from "../components/LoginButton";
// import ProductList from "../components/ProductList";
// import ReviewList from "../components/ReviewList";
// import Modal from "../components/Modal";
// import ProductReviewsList from "../components/ProductReveiwList";
// import { useAuth } from "../context/useAuth";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import "../styles/PageLayout.css";
// import "../styles/ProductList.css";
// import "../styles/GreenTheme.css";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   year: number;
//   price: number;
// }

// const StorePage: React.FC = () => {
//   const { isLoggedIn, setIsLoggedIn, user } = useAuth();
//   const navigate = useNavigate();
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       setTimeout(() => {
//         const token = Cookies.get("token");

//         if (token) {
//           console.log("Token hittades, användare är inloggad.");
//           setIsLoggedIn(true);
//         } else {
//           console.log("Ingen token hittades, användare är inte inloggad.");
//           setIsLoggedIn(false);
//         }
//       }, 500);
//     };

//     checkLoginStatus();
//   }, [setIsLoggedIn]);

//   const handleAdminPageClick = () => {
//     navigate("/adminpage");
//   };

//   const handleProductClick = (product: Product) => {
//     setSelectedProduct(product);
//   };

//   const handleModalClose = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="page-layout">
//       {isLoggedIn ? <LogoutButton /> : <LoginButton />}
//       {isLoggedIn && user?.access_level === 2 && (
//         <button onClick={handleAdminPageClick} className="admin-button">
//           Adminpanel
//         </button>
//       )}
//       <div className="page-content">
//         <h1 className="page-title">HÄR ÄR AFFÄREN!</h1>
//         <ProductList onProductClick={handleProductClick} />
//         <ReviewList />
//         <button className="review-button" onClick={() => navigate("/review")}>
//           Lämna en recension
//         </button>
//       </div>

//       {/* Modal för att visa produktinformation och recensioner */}
//       {selectedProduct && user?.access_level === 1 && (
//         <Modal onClose={handleModalClose} productId={selectedProduct.id}>
//           <div className="product-details">
//             <h2>{selectedProduct.name}</h2>
//             <p>{selectedProduct.description}</p>
//             <img
//               src={selectedProduct.imageUrl}
//               alt={selectedProduct.name}
//               className="product-image"
//             />
//             <p>År: {selectedProduct.year}</p>
//             <p>Pris: {selectedProduct.price} SEK</p>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default StorePage;
import React, { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";
import LoginButton from "../components/LoginButton";
import ProductList from "../components/ProductList";
import ReviewList from "../components/ReviewList";
import Modal from "../components/Modal";
import ProductReviewsList from "../components/ProductReveiwList";
import ProductReviewForm from "../components/ProductReviewForm";
import CartIcon from "../components/CartIcon"; // Importera kundvagnsikonen
import CartDetails from "../components/CartDetails"; // Importera CartDetails
import { useAuth } from "../context/useAuth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/PageLayout.css";
import "../styles/ProductList.css";
import "../styles/GreenTheme.css";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  year: number;
  price: number;
  stock: number;
}

const StorePage: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false); // Ny state för att visa kundvagnen

  useEffect(() => {
    const checkLoginStatus = () => {
      setTimeout(() => {
        const token = Cookies.get("token");

        if (token) {
          console.log("Token hittades, användare är inloggad.");
          setIsLoggedIn(true);
        } else {
          console.log("Ingen token hittades, användare är inte inloggad.");
          setIsLoggedIn(false);
        }
      }, 500);
    };

    checkLoginStatus();
  }, [setIsLoggedIn]);

  const handleAdminPageClick = () => {
    navigate("/adminpage");
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="page-layout">
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
      {isLoggedIn && user?.access_level === 2 && (
        <button onClick={handleAdminPageClick} className="admin-button">
          Adminpanel
        </button>
      )}
      <CartIcon onClick={toggleCart} />{" "}
      {/* Lägg till kundvagnsikonen i hörnet */}
      {showCart && <CartDetails />} {/* Visa kundvagnen om den är aktiverad */}
      <div className="page-content">
        <h1 className="page-title">HÄR ÄR AFFÄREN!</h1>
        <ProductList onProductClick={handleProductClick} />
        <ReviewList />
        {isLoggedIn && user?.access_level === 1 && (
          <button className="review-button" onClick={() => navigate("/review")}>
            Lämna en recension
          </button>
        )}
      </div>
      {/* Modal för att visa produktinformation och recensioner */}
      {selectedProduct && (
        <Modal onClose={handleModalClose} product={selectedProduct}>
          <div className="product-details">
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="product-image"
            />
            <p>År: {selectedProduct.year}</p>
            <p>Pris: {selectedProduct.price} SEK</p>
            {/* Lägg till produktrecensioner */}
            <ProductReviewsList productId={selectedProduct.id} />
            {/* Lägg till recensionformulär om användaren är en vanlig användare */}
            {user?.access_level === 1 && (
              <ProductReviewForm productId={selectedProduct.id} />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StorePage;
