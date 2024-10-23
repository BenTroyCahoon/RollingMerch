// import React, { createContext, useState, ReactNode } from "react";

// interface User {
//   username: string;
//   access_level: number;
// }
// interface AuthContextType {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (loggedIn: boolean) => void;
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState, ReactNode, useEffect } from "react";

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

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      return; // Om användaren inte är inloggad, ska vi inte starta någon timer
    }

    // Funktion för att logga ut användaren
    const logoutUser = () => {
      // Sätt ett värde i localStorage för att visa alert på login-sidan
      localStorage.setItem("autoLogout", "true");

      // Göra en begäran till backend för att logga ut och ta bort token på serversidan (t.ex. JWT i cookie)
      fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // Inkluderar cookies
      })
        .then(() => {
          // Efter utloggningsbegäran kan du rensa klientens token lagrad i localStorage eller sessionStorage
          localStorage.removeItem("token"); // eller sessionStorage.removeItem("token") om du använder sessionStorage

          // Uppdatera tillståndet för användaren och logga ut
          setIsLoggedIn(false);
          setUser(null);

          // Omdirigera till inloggningssidan
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    };

    // Timer för utloggning (10 sekunder för testning)
    let logoutTimer = setTimeout(logoutUser, 10000);

    // Funktion för att återställa timern vid användaraktivitet
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logoutUser, 10000);
    };

    // Eventlyssnare för att återställa timern vid användaraktivitet
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // Rensa eventlyssnare och timer när komponenten avmonteras eller användaren loggas ut
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
