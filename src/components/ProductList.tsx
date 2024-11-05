import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
  year: number;
}

interface ProductListProps {
  onProductClick: (product: Product) => void; // Lägg till prop för klickhändelse
}

const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Fel vid hämtning av produkter");
        }
      } catch (error) {
        console.error("Serverfel vid hämtning av produkter:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2 className="products-title">Produkter:</h2>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)} // Använd prop från parent-komponenten
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
