import { verifyToken, verifyAdmin } from "../middleware/middleware.js";
import {
  crearcancion,
  modificarcancion,
  borrarcancion,
  escucho,
  login,
  crearusuario
} from "../controllers/functions.js";
import express from "express";
const router = express.Router();
router.post("/cancion", verifyToken, verifyAdmin, crearcancion);
router.put("/cancion", verifyToken, verifyAdmin, modificarcancion);
router.delete("/cancion", verifyToken, verifyAdmin, borrarcancion);
router.post("/escucho", verifyToken, escucho);
router.post("/crearusuario", crearusuario )
router.post ("login", login)
export default router;