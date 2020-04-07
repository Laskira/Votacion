import { Router } from "express";

import {
  CrearPersona,
  ObtenerPersona,
  ActualizarPersona,
  EliminarPersona,
  ObtenerPersonasId,
  ObtenerPersonas,
  InsertarMultiplesPersonas
} from "../controllers/personas";
import { TokenValidation } from "../libs/validateToken";

const RouterPersonas: Router = Router();

RouterPersonas.route("/")
  .post(TokenValidation, CrearPersona)
  .get(TokenValidation, ObtenerPersonasId);

RouterPersonas.route("/todos").get(TokenValidation, ObtenerPersonas);

RouterPersonas.route("/:id")
  .put(TokenValidation, ActualizarPersona)
  .delete(TokenValidation, EliminarPersona);

RouterPersonas.route("/buscar").post(ObtenerPersona);

RouterPersonas.route("/multiples").post(InsertarMultiplesPersonas);

export default RouterPersonas;
