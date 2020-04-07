import { Request, Response } from "express";
import { encrypt, validateEncrypt } from "../libs/encrypt";
import jwt from "jsonwebtoken";

// Modelo
import Permisos, { IPermisos } from "../models/permisos";
import { mensaje } from "interfaces";

// Crear cuenta
export async function CrearCuenta(req: Request, res: Response) {
  const { Documento, NombreP, Password } = req.body;
  const newUser = { Documento, NombreP, Password };

  const User: IPermisos = new Permisos(newUser);
  User.Password = await encrypt(Password);
  await User.save(function(err) {
    if (err) {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Error",
        mensaje: "El documento ingresado ya se encuentra registrado"
      };
      return res.status(400).json(mensaje);
    }

    var mensaje: mensaje = {
      icon: "success",
      titulo: "Guardado exitosamente",
      mensaje: "El registro de " + NombreP
    };

    return res.status(200).json(mensaje);
  });
}

// Iniciar sesión
export async function IniciarSesion(
  req: Request,
  res: Response
): Promise<Response> {
  const { Documento, Password } = req.body;
  const User = (await Permisos.findOne({ Documento: Documento })) as IPermisos;
  if (!User) {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Error",
      mensaje: "El usuario no se encuentra registrado"
    };

    return res.status(400).json(mensaje);
  }

  const correctPassword: boolean = await validateEncrypt(
    Password,
    User.Password
  );
  if (!correctPassword) {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Error",
      mensaje: "La contraseña ingresada no coincide con el usuario"
    };

    return res.status(400).json(mensaje);
  }

  var alerta: any = "Bienvenido " + User.NombreP

  const token: string = jwt.sign(
    { _id: User._id },
    process.env.TOKEN_SECRET || "TokenTest"
  );

  return res.status(200).json({token, alerta});
}

//Perfil
export async function Perfil(req: Request, res: Response): Promise<Response> {
  const User = await Permisos.findById(req.url, { Password: 0 });
  if (!User)
    return res.status(404).json("El usuario no se encuentra registrado");

  return res.json(User);
}

//Actualizar datos
export async function ActualizarCuenta(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { NombreP, Password } = req.body;
  const UpdateUser = { NombreP, Password };

  UpdateUser.Password = await encrypt(Password);

  const UpdateCuenta = await Permisos.findByIdAndUpdate(id, UpdateUser, {
    new: true
  });

  return res.json(UpdateCuenta);
}

// Eliminar cuenta
export async function EliminarCuenta(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const User = await Permisos.findByIdAndRemove(id);

  let nombre: string = "";

  if (User) {
    nombre = User.NombreP;
  }

  var mensaje: mensaje = {
    icon: "success",
    titulo: "Se ha eliminado exitosamente",
    mensaje: "El registro de " + nombre
  };

  return res.status(200).json(mensaje);
}

// Obtener Cuentas
export async function ObtenerCuentas(
  req: Request,
  res: Response
): Promise<Response> {
  const Users = await Permisos.find();

  Users.splice(0, 1);

  return res.json(Users);
}
