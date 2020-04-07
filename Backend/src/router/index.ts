import { Router } from "express";
const router = Router();

// Importar Rutas
import RouterPermisos from "./permisos";
import RouterPersonas from "./personas";
import RouterCandidato from "./candidatos";
import RouterExtras from "./extras";
import RouterVotos from "./votos";

// Usar Rutas
router.use("/personas", RouterPersonas);
router.use("/permisos", RouterPermisos);
router.use("/votos", RouterVotos);
router.use("/candidatos", RouterCandidato);
router.use("/extras", RouterExtras);

export default router;
