import { Router } from "express";

//Controladores
import { Votar, Reportes } from "../controllers/votos";
import { TokenValidation } from "../libs/validateToken";

const RouterVotos: Router = Router();

RouterVotos.route("/").post(TokenValidation, Votar);

RouterVotos.route("/reporte").get(Reportes);

export default RouterVotos;
