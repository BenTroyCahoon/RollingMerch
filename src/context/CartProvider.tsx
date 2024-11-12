// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart måste användas inom en CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // Hämta kundkorgen från localStorage när komponenten monteras
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Uppdatera `localStorage` när kundkorgen ändras
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Funktion för att lägga till produkter i kundkorgen
//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     // Uppdatera lagret i databasen
//     fetch(`http://localhost:5000/products/${product.id}/reserve`, {
//       method: "POST",
//     }).catch((error) =>
//       console.error("Fel vid reservering av produkt:", error)
//     );
//   };

//   // Funktion för att ta bort en produkt från kundkorgen
//   const removeFromCart = (productId: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//     // Återställ lagret i databasen
//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   // Memoisera `clearCart`-funktionen så att den inte skapar en ny referens vid varje render
//   const clearCart = useCallback(() => {
//     setCart([]);
//   }, []);

//   // Rensa kundkorgen efter 10 minuter
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       clearCart();
//     }, 10 * 60 * 1000);

//     return () => clearTimeout(timer);
//   }, [cart, clearCart]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart måste användas inom en CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     // Uppdatera lagret i databasen
//     fetch(`http://localhost:5000/products/${product.id}/reserve`, {
//       method: "POST",
//     }).catch((error) =>
//       console.error("Fel vid reservering av produkt:", error)
//     );
//   };

//   const removeFromCart = (productId: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//     // Återställ lagret i databasen
//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   const clearCart = useCallback(() => {
//     setCart([]);
//     cart.forEach((item) => {
//       fetch(`http://localhost:5000/products/${item.id}/release`, {
//         method: "POST",
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     });
//   }, [cart]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       clearCart();
//     }, 10 * 60 * 1000); // Rensa kundvagnen efter 10 minuter

//     return () => clearTimeout(timer);
//   }, [cart, clearCart]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart måste användas inom en CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     // Hämta tidigare kundvagn från localStorage när komponenten mountas
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     // Uppdatera localStorage varje gång kundvagnen förändras
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     // Uppdatera lagret i databasen
//     fetch(`http://localhost:5000/products/${product.id}/reserve`, {
//       method: "POST",
//     }).catch((error) =>
//       console.error("Fel vid reservering av produkt:", error)
//     );
//   };

//   const removeFromCart = (productId: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//     // Återställ lagret i databasen
//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   const clearCart = useCallback(() => {
//     setCart([]);
//     cart.forEach((item) => {
//       fetch(`http://localhost:5000/products/${item.id}/release`, {
//         method: "POST",
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     });
//   }, [cart]);

//   // Rensa kundvagnen efter 10 minuter
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       clearCart();
//     }, 10 * 60 * 1000);

//     return () => clearTimeout(timer);
//   }, [cart, clearCart]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeOneFromCart: (productId: number) => void;
//   removeFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart måste användas inom en CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     fetch(`http://localhost:5000/products/${product.id}/reserve`, {
//       method: "POST",
//     }).catch((error) =>
//       console.error("Fel vid reservering av produkt:", error)
//     );
//   };

//   const removeOneFromCart = (productId: number) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === productId);
//       if (existingItem && existingItem.quantity > 1) {
//         return prevCart.map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         );
//       } else {
//         return prevCart.filter((item) => item.id !== productId);
//       }
//     });

//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   const removeFromCart = (productId: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }), // Du kan behöva uppdatera denna logik för att hantera rätt kvantitet.
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   const clearCart = useCallback(() => {
//     cart.forEach((item) => {
//       fetch(`http://localhost:5000/products/${item.id}/release`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: item.quantity }),
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     });
//     setCart([]);
//   }, [cart]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       clearCart();
//     }, 10 * 60 * 1000);

//     return () => clearTimeout(timer);
//   }, [cart, clearCart]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeOneFromCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeOneFromCart: (productId: number) => void;
//   removeFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart måste användas inom en CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Lägg till produkter i kundvagnen och minska lagret i databasen
//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     // Uppdatera lagret i databasen
//     fetch(`http://localhost:5000/products/${product.id}/reserve`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid reservering av produkt:", error)
//     );
//   };

//   // Ta bort en enhet av en produkt från kundvagnen och uppdatera lagret i databasen
//   const removeOneFromCart = (productId: number) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === productId);
//       if (existingItem && existingItem.quantity > 1) {
//         return prevCart.map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         );
//       } else {
//         return prevCart.filter((item) => item.id !== productId);
//       }
//     });

//     // Uppdatera lagret i databasen för en enhet
//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   // Ta bort alla enheter av en produkt från kundvagnen
//   const removeFromCart = (productId: number) => {
//     const itemToRemove = cart.find((item) => item.id === productId);
//     if (itemToRemove) {
//       setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//       // Återställ hela lagret i databasen för denna produkt
//       fetch(`http://localhost:5000/products/${productId}/release`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: itemToRemove.quantity }),
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     }
//   };

//   const clearCart = useCallback(() => {
//     cart.forEach((item) => {
//       fetch(`http://localhost:5000/products/${item.id}/release`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: item.quantity }),
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     });
//     setCart([]);
//   }, [cart]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       clearCart();
//     }, 10 * 60 * 1000);

//     return () => clearTimeout(timer);
//   }, [cart, clearCart]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeOneFromCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeOneFromCart: (productId: number) => void;
//   removeFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart måste användas inom en CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Lägg till produkt i kundvagnen
//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     // Uppdatera lagret i databasen
//     fetch(`http://localhost:5000/products/${product.id}/reserve`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid reservering av produkt:", error)
//     );
//   };

//   const removeOneFromCart = (productId: number) => {
//     setCart((prevCart) => {
//       return prevCart
//         .map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0);
//     });

//     // Uppdatera lagret i databasen genom att öka lagret för en produkt
//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   // Ta bort hela produkten från kundvagnen
//   const removeFromCart = (productId: number) => {
//     const itemToRemove = cart.find((item) => item.id === productId);
//     if (!itemToRemove) return;

//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//     // Återställ produkterna till lagret
//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: itemToRemove.quantity }),
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   // Töm kundvagnen
//   const clearCart = useCallback(() => {
//     cart.forEach((item) => {
//       fetch(`http://localhost:5000/products/${item.id}/release`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: item.quantity }),
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     });
//     setCart([]);
//   }, [cart]);

//   // Rensa kundvagnen efter 10 minuter
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       clearCart();
//     }, 1 * 60 * 1000);

//     return () => clearTimeout(timer);
//   }, [cart, clearCart]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeOneFromCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   removeOneFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart måste användas inom en CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   const clearCartTimerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         if (existingItem.quantity >= 5) {
//           console.warn("Max 5 produkter kan reserveras.");
//           return prevCart;
//         }
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     fetch(`http://localhost:5000/products/${product.id}/reserve`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid reservering av produkt:", error)
//     );
//   };

//   const removeOneFromCart = (productId: number) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === productId && item.quantity > 1
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );

//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   const removeFromCart = (productId: number) => {
//     const itemToRemove = cart.find((item) => item.id === productId);
//     if (itemToRemove) {
//       fetch(`http://localhost:5000/products/${productId}/release`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: itemToRemove.quantity }),
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     }

//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   const clearCart = useCallback(() => {
//     cart.forEach((item) => {
//       fetch(`http://localhost:5000/products/${item.id}/release`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: item.quantity }),
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     });
//     setCart([]);
//   }, [cart]);

//   // Rensa kundvagnen efter 1 minut
//   useEffect(() => {
//     if (cart.length > 0) {
//       if (clearCartTimerRef.current) {
//         clearTimeout(clearCartTimerRef.current);
//       }
//       clearCartTimerRef.current = setTimeout(() => {
//         clearCart();
//       }, 1 * 60 * 1000);
//     }
//     return () => {
//       if (clearCartTimerRef.current) {
//         clearTimeout(clearCartTimerRef.current);
//       }
//     };
//   }, [cart, clearCart]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, removeOneFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   removeOneFromCart: (productId: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart måste användas inom en CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   const clearCartTimerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         if (existingItem.quantity >= 5) {
//           console.warn("Max 5 produkter kan reserveras.");
//           return prevCart;
//         }
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     fetch(`http://localhost:5000/products/${product.id}/reserve`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid reservering av produkt:", error)
//     );
//   };

//   const removeOneFromCart = (productId: number) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === productId && item.quantity > 1
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );

//     fetch(`http://localhost:5000/products/${productId}/release`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).catch((error) =>
//       console.error("Fel vid återställning av produkt:", error)
//     );
//   };

//   const removeFromCart = (productId: number) => {
//     const itemToRemove = cart.find((item) => item.id === productId);
//     if (itemToRemove) {
//       fetch(`http://localhost:5000/products/${productId}/release`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: itemToRemove.quantity }),
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     }

//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   const clearCart = useCallback(() => {
//     cart.forEach((item) => {
//       fetch(`http://localhost:5000/products/${item.id}/release`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: item.quantity }),
//       }).catch((error) =>
//         console.error("Fel vid återställning av produkt:", error)
//       );
//     });
//     setCart([]);
//     // Lägg till ett popup-meddelande när kundvagnen rensas efter 1 minut
//     window.alert(
//       "Reservationstiden för produkterna i din kundvagn har gått ut."
//     );
//   }, [cart]);

//   // Rensa kundvagnen efter 1 minut
//   useEffect(() => {
//     if (cart.length > 0) {
//       if (clearCartTimerRef.current) {
//         clearTimeout(clearCartTimerRef.current);
//       }
//       clearCartTimerRef.current = setTimeout(() => {
//         clearCart();
//       }, 1 * 60 * 1000);
//     }
//     return () => {
//       if (clearCartTimerRef.current) {
//         clearTimeout(clearCartTimerRef.current);
//       }
//     };
//   }, [cart, clearCart]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, removeOneFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
  removeOneFromCart: (productId: number) => void;
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const clearCartTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Kontrollera om användaren försöker lägga till fler än 5 produkter
        if (existingItem.quantity >= 5) {
          alert("Max 5 produkter kan reserveras för denna vara.");
          return prevCart;
        }
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fel vid reservering av produkt");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Backend-respons:", data);
      })

      .catch((error) =>
        console.error("Fel vid reservering av produkt:", error)
      );
  };

  const removeOneFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    fetch(`http://localhost:5000/products/${productId}/release`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fel vid reservering av produkt");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Backend-respons:", data);
      })

      .catch((error) =>
        console.error("Fel vid återställning av produkt:", error)
      );
  };

  const removeFromCart = (productId: number) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    if (itemToRemove) {
      fetch(`http://localhost:5000/products/${productId}/release`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: itemToRemove.quantity }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Fel vid reservering av produkt");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Backend-respons:", data);
        })

        .catch((error) =>
          console.error("Fel vid återställning av produkt:", error)
        );
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = useCallback(() => {
    cart.forEach((item) => {
      fetch(`http://localhost:5000/products/${item.id}/release`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity }),
      }).catch((error) =>
        console.error("Fel vid återställning av produkt:", error)
      );
    });
    setCart([]);
    window.alert(
      "Reservationstiden för produkterna i din kundvagn har gått ut."
    );
  }, [cart]);

  useEffect(() => {
    if (cart.length > 0) {
      if (clearCartTimerRef.current) {
        clearTimeout(clearCartTimerRef.current);
      }
      clearCartTimerRef.current = setTimeout(() => {
        clearCart();
      }, 1 * 60 * 1000);
    }
    return () => {
      if (clearCartTimerRef.current) {
        clearTimeout(clearCartTimerRef.current);
      }
    };
  }, [cart, clearCart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, removeOneFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
