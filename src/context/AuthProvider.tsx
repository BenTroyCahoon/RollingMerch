// import React, { createContext, useState, ReactNode, useEffect } from "react";

// // Definiera User-typen
// interface User {
//   username: string;
//   access_level: number;
// }

// // Definiera AuthContext-typen
// interface AuthContextType {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (loggedIn: boolean) => void;
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// // Skapa AuthContext med undefined som standardvärde
// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// // AuthProvider-komponent som håller AuthContext
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       return; // Om användaren inte är inloggad, starta inte någon timer
//     }

//     // Funktion för att logga ut användaren
//     const logoutUser = () => {
//       localStorage.setItem("autoLogout", "true");

//       fetch("http://localhost:5000/logout", {
//         method: "POST",
//         credentials: "include",
//       })
//         .then(() => {
//           localStorage.removeItem("token");
//           setIsLoggedIn(false);
//           setUser(null);
//           window.location.href = "/login"; // Omdirigera till login-sidan
//         })
//         .catch((error) => {
//           console.error("Logout failed:", error);
//         });
//     };

//     // Timer för utloggning (5 minuter)
//     let logoutTimer = setTimeout(logoutUser, 300000);

//     // Funktion för att återställa timern vid användaraktivitet
//     const resetTimer = () => {
//       clearTimeout(logoutTimer);
//       logoutTimer = setTimeout(logoutUser, 300000);
//     };

//     // Eventlyssnare för att återställa timern vid användaraktivitet
//     window.addEventListener("mousemove", resetTimer);
//     window.addEventListener("keydown", resetTimer);
//     window.addEventListener("click", resetTimer);
//     window.addEventListener("scroll", resetTimer);

//     // Rensa upp eventlyssnare och timer när komponenten avmonteras eller användaren loggas ut
//     return () => {
//       clearTimeout(logoutTimer);
//       window.removeEventListener("mousemove", resetTimer);
//       window.removeEventListener("keydown", resetTimer);
//       window.removeEventListener("click", resetTimer);
//       window.removeEventListener("scroll", resetTimer);
//     };
//   }, [isLoggedIn]);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

// Definiera User-typen
interface User {
  username: string;
  access_level: number;
}

// Definiera AuthContext-typen
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

// Skapa AuthContext med undefined som standardvärde
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// En hook för att använda AuthContext i komponenter
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider-komponent som håller AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Återställ inloggningsstatus från localStorage
    const storedStatus = localStorage.getItem("isLoggedIn");
    return storedStatus ? JSON.parse(storedStatus) : false;
  });

  const [user, setUser] = useState<User | null>(() => {
    // Återställ användardata från localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Uppdatera localStorage när inloggningsstatus eller användardata ändras
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (!isLoggedIn) {
      return; // Om användaren inte är inloggad, starta inte någon timer
    }

    // Funktion för att logga ut användaren
    const logoutUser = () => {
      localStorage.setItem("autoLogout", "true");

      fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      })
        .then(() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUser(null);
          window.location.href = "/login"; // Omdirigera till login-sidan
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    };

    // Timer för utloggning (5 minuter)
    let logoutTimer = setTimeout(logoutUser, 300000);

    // Funktion för att återställa timern vid användaraktivitet
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logoutUser, 300000);
    };

    // Eventlyssnare för att återställa timern vid användaraktivitet
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // Rensa upp eventlyssnare och timer när komponenten avmonteras eller användaren loggas ut
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
