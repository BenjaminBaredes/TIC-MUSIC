import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/functions.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Falta el token" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user?.rol !== "A") {
      return res.status(403).json({ error: "Solo un admin puede hacer esto" });
    }
    next();
  };