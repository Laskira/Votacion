import { Router } from "express";

import {
  ObtenerJornadas,
  Contadores
} from "../controllers/extras";

const RouterExtras: Router = Router();

RouterExtras.route("/jornadas").get(ObtenerJornadas);

RouterExtras.route("/contador").get(Contadores);

export default RouterExtras;
