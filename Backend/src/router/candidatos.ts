import { Router } from "express";
import upload from "../libs/multer";

import {
  ObtenerCandidatoId,
  EliminarCandidato,
  ActualizarCandidato,
  CrearCandidato,
  ActualizarFotoCandidato,
  ObtenerCandidatos,
  ObtenerCandidatosJornada
} from "../controllers/candidatos";
import { TokenValidation } from "../libs/validateToken";

const RouterCandidato: Router = Router();

RouterCandidato.route("/")
  .get(ObtenerCandidatos)
  .post(TokenValidation, upload.single("Foto"), CrearCandidato);

RouterCandidato.route("/jornada/:jornada").get(ObtenerCandidatosJornada);

RouterCandidato.route("/:id")
  .get(TokenValidation, ObtenerCandidatoId)
  .delete(TokenValidation, EliminarCandidato)
  .put(TokenValidation, ActualizarCandidato);

RouterCandidato.route("/foto/:id").put(
  TokenValidation,
  upload.single("Foto"),
  ActualizarFotoCandidato
);

export default RouterCandidato;
