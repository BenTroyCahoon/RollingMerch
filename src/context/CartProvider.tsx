import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart måste användas inom en CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Funktion för att lägga till produkter i kundkorgen
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Uppdatera lagret i databasen
    fetch(`http://localhost:5000/products/${product.id}/reserve`, {
      method: "POST",
    }).catch((error) =>
      console.error("Fel vid reservering av produkt:", error)
    );
  };

  // Funktion för att ta bort en produkt från kundkorgen
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    // Återställ lagret i databasen
    fetch(`http://localhost:5000/products/${productId}/release`, {
      method: "POST",
    }).catch((error) =>
      console.error("Fel vid återställning av produkt:", error)
    );
  };

  // Memoisera `clearCart`-funktionen så att den inte skapar en ny referens vid varje render
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Rensa kundkorgen efter 10 minuter
  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart();
    }, 2 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [cart, clearCart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
