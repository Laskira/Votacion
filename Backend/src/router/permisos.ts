import { Router } from "express";

//Controladores
import {
  CrearCuenta,
  IniciarSesion,
  Perfil,
  ActualizarCuenta,
  EliminarCuenta,
  ObtenerCuentas
} from "../controllers/permisos";
import { TokenValidation } from "../libs/validateToken";

const RouterPermisos: Router = Router();

RouterPermisos.route("/")
  .post(CrearCuenta)
  .get(TokenValidation, Perfil);

RouterPermisos.route("/acceder").post(IniciarSesion);

RouterPermisos.route("/:id")
  .put(TokenValidation, ActualizarCuenta)
  .delete(TokenValidation, EliminarCuenta);

RouterPermisos.route("/cuentas").get(TokenValidation, ObtenerCuentas);

export default RouterPermisos;
