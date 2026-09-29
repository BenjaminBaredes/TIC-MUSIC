import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { query } from "./db.js";

const JWT_SECRET = "secreto_para_la_actividad_123";

export const crearusuario = async (req, res) => {
  const { userid, nombre, password } = req.body;

  if (!userid || !nombre || !password) {
    return res.status(400).json({ error: "Faltan userid, nombre o password" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await query(
    "INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3) RETURNING id, nombre",
    [userid, nombre, hashedPassword]
  );

  res.status(201).json(result.rows[0]);
};

export const login = async (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res.status(400).json({ error: "Faltan userid o password" });
  }

  const result = await query(
    "SELECT id, nombre, password FROM usuario WHERE id = $1",
    [userid]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ error: "El usuario no existe" });
  }

  const usuario = result.rows[0];

  const ok = await bcrypt.compare(password, usuario.password);

  if (!ok) {
    return res.status(401).json({ error: "Password incorrecto" });
  }

  const token = jwt.sign(
    { id: usuario.id, nombre: usuario.nombre },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};

export const escucho = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Falta el token" });
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }

  const result = await query(
    `SELECT c.id, c.nombre, e.reproducciones
     FROM escucha e
     JOIN cancion c ON c.id = e.cancion_id
     WHERE e.usuario_id = $1`,
    [payload.id]
  );

  res.json(result.rows);
};