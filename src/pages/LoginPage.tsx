import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        // Spara tokenen i localStorage

        setMessage("Inloggning lyckades!");

        const userInfoResponse = await fetch("http://localhost:3000/userinfo", {
          method: "GET",
          credentials: "include", // Inkludera cookies i begäran
        });

        if (userInfoResponse.ok) {
          const userData = await userInfoResponse.json();

          // Kontrollera access level och navigera till rätt sida
          if (userData.access_level === 2) {
            // Administratör: omdirigera till adminsidan
            navigate("/adminpage");
          } else if (userData.access_level === 1) {
            navigate("/userpage");
          } else {
            navigate("/");
          }
        } else {
          // Visa felmeddelande om inloggningen misslyckades
          setMessage("Misslyckades med att hämta användarinfo");
        }
      } else {
        const data = await response.json();
        setMessage(data.message || "inloggning misslyckades");
      }
    } catch (error) {
      console.error("Fel vid inloggning:", error);
      setMessage("Serverfel, försök igen senare.");
    }
  };

  return (
    <div className="login-page">
      <h1>Inloggning</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Logga in</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
