import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthButton.css";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ta bort token från localStorage
    localStorage.removeItem("token");

    // Omdirigera till inloggningssidan
    navigate("/");
  };

  return <button onClick={handleLogout}>Logga ut</button>;
};

export default Logout;
