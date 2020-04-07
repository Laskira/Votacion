import { Request, Response } from "express";

//Modelo
import Votos, { IVoto } from "../models/votos";
import Candidatos, { ICandidatos } from "../models/candidatos";
import { mensaje } from "interfaces";

// Votar
export async function Votar(req: Request, res: Response) {
  const IdPersona = req.url;
  const { IdCandidato } = req.body;

  const NewVoto = { IdPersona, IdCandidato };

  var mensaje: mensaje = {
    icon: "error",
    titulo: "Lo sentimos, usted ya ha votodo"
  };

  const Voto = new Votos(NewVoto) as IVoto;
  Voto.save(async function(err) {
    if (err) return res.status(400).json(mensaje);

    const candidato = (await Candidatos.findById(IdCandidato)) as ICandidatos;
    if (candidato) {
      candidato.CantVoto = candidato.CantVoto + 1;
      await candidato.save();
    }
    mensaje = {
      icon: "success",
      titulo: "Gracias por votar"
    };

    return res.status(200).json(mensaje);
  });
}

// Reporte votos
export async function Reportes(req: Request, res: Response) {
  const Datos = await Candidatos.find();

  var CountVotosDiurna: number = 0
  var CountVotosNocturna: number = 0
  var CountVotosFinDeSemana: number = 0

  var Diurna: any = []

  var Nocturna: any = []

  var FinDeSemana: any = []

  Datos.map(function(dato: ICandidatos) {
    if (dato.Jornada === "Diurna") {
      var candidato = {
        name: dato.NombreC,
        value: dato.CantVoto
      };
      CountVotosDiurna = CountVotosDiurna + dato.CantVoto
      Diurna.push(candidato);
    }

    if (dato.Jornada === "Nocturna") {
      var candidato = {
        name: dato.NombreC,
        value: dato.CantVoto
      };

      CountVotosNocturna = CountVotosNocturna + dato.CantVoto;
      Nocturna.push(candidato)
    }

    if (dato.Jornada === "Fin de Semana") {
      var candidato = {
        name: dato.NombreC,
        value: dato.CantVoto
      };

      CountVotosFinDeSemana = CountVotosFinDeSemana + dato.CantVoto
      FinDeSemana.push(candidato)
    }

  });

  res.json({Diurna, Nocturna, FinDeSemana, CountVotosDiurna, CountVotosNocturna, CountVotosFinDeSemana});
}
