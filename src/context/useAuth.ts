import { useContext } from "react";
import { AuthContext } from "./AuthProvider"; // Uppdatera vägen om det behövs

// En hook för att använda AuthContext i komponenter
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
