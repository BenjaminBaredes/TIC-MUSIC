import { verifyToken, verifyAdmin } from "../middleware/middleware.js";
import {
  crearcancion,
  modificarcancion,
  borrarcancion,
  escucho,
} from "../controllers/functions.js";

router.post("/cancion", verifyToken, verifyAdmin, crearcancion);
router.put("/cancion", verifyToken, verifyAdmin, modificarcancion);
router.delete("/cancion", verifyToken, verifyAdmin, borrarcancion);

router.post("/escucho", verifyToken, escucho);