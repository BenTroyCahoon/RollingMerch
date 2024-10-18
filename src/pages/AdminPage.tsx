import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

const AdminPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Ingen token hittades. Omdirigerar till inloggningssidan...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
      return;
    }

    const fetchAdminPage = async () => {
      try {
        const response = await fetch("http://localhost:3000/adminpage", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
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
      <Logout />
    </div>
  );
};

export default AdminPage;
