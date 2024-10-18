import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

const AdminPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchAdminPage = async () => {
      try {
        const response = await fetch("http://localhost:3000/adminpage", {
          method: "GET",
          credentials: "include", // Detta skickar cookies automatiskt
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
          setIsLoggedIn(true); // Inloggning lyckades, visa sidan
        } else {
          setMessage("Åtkomst nekad. Omdirigerar till inloggningssidan...");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.error("Fel vid hämtning av adminsidan:", error);
        setMessage("Serverfel. Försök igen senare.");
      }
    };

    fetchAdminPage();
  }, [navigate]);
  return (
    <div className="admin-page">
      <h1>Adminsida</h1>
      <p>{message}</p>
      {isLoggedIn && <Logout />}
    </div>
  );
};

export default AdminPage;
