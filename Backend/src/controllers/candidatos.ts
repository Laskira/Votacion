import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

//Modelos
import Candidatos, { ICandidatos } from "../models/candidatos";
import { mensaje } from "interfaces";

// Crear Candidato
export async function CrearCandidato(req: Request, res: Response) {
  const { NombreC, Jornada, CantVoto, Lema } = req.body;

  var Targeton = "";
  if (req.body.Tarjeton < 10) {
    Targeton = "0" + req.body.Tarjeton;
  } else {
    Targeton = req.body.Tarjeton;
  }
  const NewCandidatos = {
    Foto: req.file.path,
    NombreC,
    Jornada,
    CantVoto,
    Targeton,
    Lema
  };

  const Candidato: ICandidatos = new Candidatos(NewCandidatos);

  let text: string;

  await Candidato.save(function(err) {
    if (err) {
      fs.unlink(path.resolve(req.file.path));
      if (err.keyPattern.Targeton != undefined) {
        text = "Este tarjetón";
      }
      console.log(err.keyPattern);

      var mensaje: mensaje = {
        icon: "error",
        titulo: "Error",
        mensaje: text + " ya se encuentra registrado"
      };
      return res.status(400).json(mensaje);
    }

    var mensaje: mensaje = {
      icon: "success",
      titulo: "Se guardo exitosamente",
      mensaje: "El registro de " + NombreC
    };

    return res.status(200).json(mensaje);
  });
}

// Buscar Candidato
export async function ObtenerCandidatoId(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const Candidato = await Candidatos.findById(id);

  return res.json(Candidato);
}

// Obtener candidatos por Jornada
export async function ObtenerCandidatosJornada(
  req: Request,
  res: Response
): Promise<Response> {
  const { jornada } = req.params;
  var buscar = jornada;

  if (jornada == "fin-de-semana") {
    buscar = "Fin de Semana";
  }
  const Candidato = await Candidatos.find({ Jornada: buscar });

  return res.json(Candidato);
}

// Eliminar Candidato
export async function EliminarCandidato(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const Candidato = await Candidatos.findByIdAndRemove(id);

  let nombre: string = "";
  if (Candidato) {
    nombre = Candidato.NombreC;
    await fs.unlink(path.resolve(Candidato.Foto));
  }

  var mensaje: mensaje = {
    icon: "success",
    titulo: "Se elimino exitosamente",
    mensaje: "El registro de " + nombre
  };

  return res.status(200).json(mensaje);
}

// Actualizar Candidato
export async function ActualizarCandidato(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { NombreC, Jornada, Targeton, Lema } = req.body;

  const Candidato = await Candidatos.findByIdAndUpdate(
    id,
    {
      NombreC,
      Jornada,
      Targeton,
      Lema
    },
    { new: true }
  );

  return res.json(Candidato);
}

// Actualizar Foto
export async function ActualizarFotoCandidato(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  const candidato = (await Candidatos.findById(id)) as ICandidatos;

  if (candidato) {
    await fs.unlink(path.resolve(candidato.Foto));
  }
  const Candidato = await Candidatos.findByIdAndUpdate(
    id,
    {
      Foto: req.file.path
    },
    { new: true }
  );

  return res.json(Candidato);
}

// Obtener Candidatos
export async function ObtenerCandidatos(
  req: Request,
  res: Response
): Promise<Response> {
  const candidatos: ICandidatos[] = await Candidatos.find();

  return res.json(candidatos);
}
