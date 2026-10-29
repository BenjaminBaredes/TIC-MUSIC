import { crearUsuario, loguear } from "../services/service.js";

export const crearusuario = async (req, res) => {
  const { userid, nombre, password } = req.body;

  if (!userid || !nombre || !password) {
    return res.status(400).json({ error: "Faltan userid, nombre o password" });
  }

  const usuario = await crearUsuario(userid, nombre, password);
  res.status(201).json(usuario);
};

export const login = async (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res.status(400).json({ error: "Faltan userid o password" });
  }

  const resultado = await loguear(userid, password);

  if (resultado.error) {
    return res.status(401).json({ error: resultado.error });
  }

  res.json({ token: resultado.token });
};
export const crearcancion = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Falta el nombre" });
  }

  const cancion = await crearCancion(nombre);
  res.status(201).json(cancion);
};

export const modificarcancion = async (req, res) => {
  const { id, nombre } = req.body;

  if (!id || !nombre) {
    return res.status(400).json({ error: "Faltan id o nombre" });
  }

  const cancion = await modificarCancion(id, nombre);

  if (!cancion) {
    return res.status(404).json({ error: "La canción no existe" });
  }

  res.json(cancion);
};

export const borrarcancion = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Falta el id" });
  }

  const borrada = await borrarCancion(id);

  if (!borrada) {
    return res.status(404).json({ error: "La canción no existe" });
  }

  res.json({ mensaje: "Canción borrada" });
};

export const escucho = async (req, res) => {
  const { id } = req.body; // id de la canción
  const usuarioId = req.user.id; // sale del token, no se pide por parámetro

  if (!id) {
    return res.status(400).json({ error: "Falta el id de la canción" });
  }

  const escucha = await registrarEscucha(usuarioId, id);

  if (!escucha) {
    return res.status(404).json({ error: "La canción no existe" });
  }

  res.status(201).json(escucha);
};