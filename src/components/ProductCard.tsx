// import React from "react";
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

// interface ProductCardProps {
//   product: Product;
//   onClick: () => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
//   return (
//     <div className="product-card" onClick={onClick}>
//       <img src={product.imageUrl} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>{product.year}</p>
//       <p>{product.price} SEK</p>
//     </div>
//   );
// };

// export default ProductCard;
// import React from "react";
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

// interface ProductCardProps {
//   product: Product;
//   onCardClick: () => void; // Byt till tydligare namn för klickhantering
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onCardClick }) => {
//   return (
//     <div className="product-card" onClick={onCardClick}>
//       <img src={product.imageUrl} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>{product.year}</p>
//       <p>{product.price} SEK</p>
//     </div>
//   );
// };

// export default ProductCard;
// import React from "react";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   year: number;
//   price: number;
// }

// interface ProductCardProps {
//   product: Product;
//   onProductClick: (product: Product) => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   onProductClick,
// }) => {
//   return (
//     <div className="product-card" onClick={() => onProductClick(product)}>
//       <img src={product.imageUrl} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>{product.year}</p>
//       <p>{product.price} SEK</p>
//     </div>
//   );
// };

// export default ProductCard;
import React from "react";
import "../styles/ProductList.css";
import "../styles/GreenTheme.css";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  year: number;
  price: number;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void; // Lägg till onClick-prop här
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.year}</p>
      <p>{product.price} SEK</p>
    </div>
  );
};

export default ProductCard;
