import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { query } from "../db.js";
import { JWT_SECRET } from "../jwt.js";

export const crearUsuario = async (userid, nombre, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await query(
    "INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3) RETURNING id, nombre, rol, fan",
    [userid, nombre, hashedPassword]
  );

  return result.rows[0];
};

export const loguear = async (userid, password) => {
  const result = await query(
    "SELECT id, nombre, password, rol FROM usuario WHERE id = $1",
    [userid]
  );

  if (result.rows.length === 0) {
    return { error: "El usuario no existe" };
  }

  const usuario = result.rows[0];
  const ok = await bcrypt.compare(password, usuario.password);

  if (!ok) {
    return { error: "Password incorrecto" };
  }

  const token = jwt.sign(
    { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};
export const crearCancion = async (nombre) => {
    const result = await query(
      "INSERT INTO cancion (nombre) VALUES ($1) RETURNING id, nombre",
      [nombre]
    );
    return result.rows[0];
  };
  
  export const modificarCancion = async (id, nombre) => {
    const result = await query(
      "UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING id, nombre",
      [nombre, id]
    );
    return result.rows[0]; // undefined si la canción no existe
  };
  
  export const borrarCancion = async (id) => {
    // Primero las escuchas: escucha.cancion_id es FK y bloquearía el borrado
    await query("DELETE FROM escucha WHERE cancion_id = $1", [id]);
  
    const result = await query(
      "DELETE FROM cancion WHERE id = $1 RETURNING id",
      [id]
    );
    return result.rows[0]; // undefined si la canción no existe
  };
  
  export const registrarEscucha = async (usuarioId, cancionId) => {
    const cancion = await query("SELECT id FROM cancion WHERE id = $1", [cancionId]);
  
    if (cancion.rows.length === 0) {
      return null; // la canción no existe
    }
  
    // Si ya escuchó esa canción, suma una reproducción
    const actualizada = await query(
      `UPDATE escucha SET reproducciones = reproducciones + 1
       WHERE usuario_id = $1 AND cancion_id = $2
       RETURNING usuario_id, cancion_id, reproducciones`,
      [usuarioId, cancionId]
    );
  
    if (actualizada.rows.length > 0) {
      return actualizada.rows[0];
    }
  
    // Si es la primera vez, crea el registro
    const nueva = await query(
      `INSERT INTO escucha (usuario_id, cancion_id, reproducciones)
       VALUES ($1, $2, 1)
       RETURNING usuario_id, cancion_id, reproducciones`,
      [usuarioId, cancionId]
    );
    return nueva.rows[0];
  };