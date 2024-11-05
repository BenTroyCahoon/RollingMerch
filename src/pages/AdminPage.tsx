import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import LogoutButton from "../components/LogoutButton";
import "../styles/AdminPageStyle.css";
import "../styles/GreenTheme.css";

interface LoginAttempt {
  id: number;
  username: string;
  attempt_time: string;
  success: boolean;
  ip_address: string;
  user_agent: string;
}

const AdminPage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const navigate = useNavigate();

  console.log("ADMIN - Är användaren inloggad:", isLoggedIn);
  console.log("ADMIN - Användarinformation:", user);

  useEffect(() => {
    const fetchAdminPage = async () => {
      try {
        const response = await fetch("http://localhost:5000/adminpage", {
          method: "GET",
          credentials: "include", // Skicka cookies automatiskt
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);

          // Hämta inloggningsförsök
          const loginAttemptsResponse = await fetch(
            "http://localhost:5000/login-attempts",
            {
              method: "GET",
              credentials: "include", // Skicka cookies automatiskt
            }
          );

          if (loginAttemptsResponse.ok) {
            const attemptsData = await loginAttemptsResponse.json();
            console.log("API-svar från /login-attempts:", attemptsData); // Logga svaret

            // Kontrollera att attemptsData är en array

            setLoginAttempts(attemptsData);
            console.log("DETTA?!?!?");
            console.log("ARRAY?", loginAttempts);
          } else {
            console.error("Inloggningsförsök-data är inte en array");
            setLoginAttempts([]); // Om det inte är en array, sätt som tom array
          }
        } else {
          console.error("Fel vid hämtning av inloggningsförsök");
        }
      } catch (error) {
        console.error("Fel vid hämtning av adminsidan:", error);
        setMessage("Serverfel. Försök igen senare.");
      }
    };

    fetchAdminPage();
  }, [isLoggedIn, user, navigate]);

  // Funktion för att förenkla user agent-strängen
  const simplifyUserAgent = (userAgent: string) => {
    if (!userAgent) return "Unknown";
    userAgent = userAgent.toLowerCase();

    if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
      return "Chrome";
    } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
      return "Safari";
    } else if (userAgent.includes("firefox")) {
      return "Firefox";
    } else if (userAgent.includes("edg")) {
      return "Edge";
    } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
      return "Opera";
    } else {
      return "Unknown";
    }
  };

  // Sortera och hämta de senaste 100 inloggningsförsöken
  const latestLoginAttempts = [...loginAttempts]
    .sort(
      (a, b) =>
        new Date(b.attempt_time).getTime() - new Date(a.attempt_time).getTime()
    )
    .slice(0, 100);

  console.log(latestLoginAttempts);

  const handleAddProductClick = () => {
    navigate("/products"); // Navigera till sidan där admin kan lägga till produkt
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="page-layout">
      {isLoggedIn && <LogoutButton />}
      <button className="add-product-button" onClick={handleAddProductClick}>
        Lägg till ny produkt
      </button>
      <button onClick={handleHomeClick} className="home-button">
        Till Hem
      </button>
      <div className="page-content">
        <h1 className="page-title">Adminsida</h1>
        <p>{message}</p>

        <div className="login-attempts-container">
          {latestLoginAttempts.length > 0 ? (
            latestLoginAttempts.map((attempt, index) => (
              <div className="login-attempt-row" key={index}>
                <div className="login-attempt-cell">{attempt.id}</div>
                <div className="login-attempt-cell">{attempt.username}</div>
                <div className="login-attempt-cell">
                  {new Date(attempt.attempt_time).toLocaleString()}
                </div>
                <div className="login-attempt-cell">
                  {attempt.success ? (
                    <span className="success-text">Ja</span>
                  ) : (
                    <span className="error-text">Nej</span>
                  )}
                </div>
                <div className="login-attempt-cell">{attempt.ip_address}</div>
                <div className="login-attempt-cell">
                  {simplifyUserAgent(attempt.user_agent)}
                </div>
              </div>
            ))
          ) : (
            <p>Inga inloggningsförsök att visa</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
