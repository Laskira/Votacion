import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//Modelo
import Personas, { IPersonas } from "../models/personas";
import { mensaje } from "interfaces";
import votos, { IVoto } from "../models/votos";

//Crear persona
export async function CrearPersona(req: Request, res: Response) {
  const { Documento, Nombres, P_Apellido, S_Apellido } = req.body;
  const newPersona = { Documento, Nombres, P_Apellido, S_Apellido };

  const Persona: IPersonas = new Personas(newPersona);

  await Persona.save(function(err) {
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
      mensaje: "El registro de " + Nombres + " " + P_Apellido
    };

    return res.status(200).json(mensaje);
  });
}

//Buscar persona Documento
export async function ObtenerPersona(req: Request, res: Response) {
  const { Documento } = req.body;
  const Persona = await Personas.findOne({ Documento: Documento }) as IPersonas;

  if (!Persona) {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Su documento no existe",
      mensaje: "Por favor, comuniquese con el encargado del ambiente"
    };
    return res.status(400).json(mensaje);
  }

  const Voto = (await votos.findOne({ IdPersona: Persona._id })) as IVoto;
  
  if (Voto) {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Lo sentimos, usted ya ha votado"
    };
    return res.status(400).json(mensaje);
  }

  const token: string = jwt.sign(
    { _id: Persona._id },
    process.env.TOKEN_SECRET || "TokenTest"
  );

  return res.status(200).json(token);
}

//Buscar persona Id
export async function ObtenerPersonasId(
  req: Request,
  res: Response
): Promise<Response> {
  const Persona = await Personas.findById(req.url);

  return res.json(Persona);
}

//Actualizar persona
export async function ActualizarPersona(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { Nombres, P_Apellido, S_Apellido } = req.body;

  const Persona = await Personas.findByIdAndUpdate(
    id,
    {
      Nombres,
      P_Apellido,
      S_Apellido
    },
    { new: true }
  );

  return res.json(Persona);
}

//Eliminar persona
export async function EliminarPersona(req: Request, res: Response) {
  const { id } = req.params;
  const Persona = (await Personas.findByIdAndRemove(id)) as IPersonas;

  let nombre: string = "";
  if (Persona) {
    nombre = Persona.Nombres + " " + Persona.P_Apellido;
  }

  var mensaje: mensaje = {
    icon: "success",
    titulo: "Se ha eliminado exitosamente",
    mensaje: "El registro de " + nombre
  };

  return res.status(200).json(mensaje);
}

//Obtener personas
export async function ObtenerPersonas(
  req: Request,
  res: Response
): Promise<Response> {
  const personas = await Personas.find().exec();

  return res.json(personas);
}

// Insertar Multiples Datos
export async function InsertarMultiplesPersonas(
  req: Request,
  res: Response
): Promise<Response> {
  const { personas } = req.body;

  const Datos = await Personas.collection.insert(personas, function(err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiples documentos insertados en la coleción");
    }
  });

  return res.json("Correcto");
}
