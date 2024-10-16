import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mariadb from "mariadb";
import cors from "cors";
import validator from "validator";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Definiera __dirname med ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Använd absolut sökväg för att ladda in .env från projektets rotkatalog
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Kontrollera att miljövariabeln är laddad
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET saknas i miljövariabler");
}
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true, // Tillåter cookies att skickas
  })
);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// Konfigurera Content Security Policy (CSP) med Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      // Lägg till andra direktiv om det behövs, t.ex. för CDN
      // scriptSrc: ["'self'", "https://cdn.example.com"],
    },
  })
);

// Setup connection to MariaDB
const pool = mariadb.createPool({
  host: "localhost",
  user: "birgitt",
  password: "andersson",
  database: "RollingMerch",
  connectionLimit: 10, // För att begränsa antalet samtidiga anslutningar
});

// Kontrollera anslutningen till MariaDB innan servern startar
pool
  .getConnection()
  .then((conn) => {
    console.log("Anslutning till MariaDB lyckades.");
    conn.release();
  })
  .catch((err) => {
    console.error("Misslyckades med att ansluta till MariaDB:", err);
    process.exit(1); // Avslutar processen om databasanslutningen misslyckas
  });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Original användarnamn:", username);
    // Sanera användarnamn för att undvika XSS
    let sanitizedUsername = validator.escape(username);

    console.log("Sanerat användarnamn:", sanitizedUsername);

    const conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM logins WHERE username = ?", [
      sanitizedUsername,
    ]);
    conn.release(); // Frigör anslutningen när vi är klara

    const user = result[0];

    if (!user) {
      return res
        .status(400)
        .json({ message: "Fel användarnamn eller lösenord" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Fel användarnamn eller lösenord" });
    }

    const token = jwt.sign(
      { username: user.username, access_level: user.access_level },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Sätt JWT-token i HttpOnly, Secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Sätt till true i produktion
      sameSite: "Strict", // eller 'Lax' baserat på dina behov
      maxAge: 60 * 60 * 1000, // 1 timme
    });

    return res.json({
      message: "Inloggning lyckades",
      username: user.username,
      access_level: user.access_level,
    });
  } catch (error) {
    console.error("Serverfel:", error);
    return res.status(500).json({ message: "Serverfel" });
  }
});

// POST /logout för att logga ut användaren
app.post("/logout", (req, res) => {
  res.clearCookie("token"); // Rensar JWT-cookien från klienten
  res.json({ message: "Utloggning lyckades" });
});

// Middleware för att verifiera JWT och roller via cookies
const verifyToken = (role) => (req, res, next) => {
  const token = req.cookies.token; // Hämta token från cookien

  if (!token) {
    return res.status(401).json({ message: "Ingen token angiven" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verifiera token med hemlig nyckel
    req.user = decoded;

    // Kontrollera om användaren har tillräcklig åtkomstnivå
    if (role !== undefined && req.user.access_level < role) {
      return res.status(403).json({ message: "Åtkomst nekad" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Ogiltig token" });
  }
};

// GET /userpage - skyddad rutt för användare och administratörer
app.get("/userpage", verifyToken(1), (req, res) => {
  res.json({ message: "Välkommen till användarsidan!" });
});

// GET /adminpage - skyddad rutt för administratörer
app.get("/adminpage", verifyToken(2), (req, res) => {
  res.json({ message: "Välkommen till adminsidan!" });
});

// GET /userinfo - returnera användarens information baserat på JWT-token
app.get("/userinfo", verifyToken(), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Ingen token angiven" });
  }

  // Returnera användarinformation från JWT-tokenen
  res.json({
    username: req.user.username,
    access_level: req.user.access_level,
  });
});

// Starta servern på port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern kör på port ${PORT}`);
});
