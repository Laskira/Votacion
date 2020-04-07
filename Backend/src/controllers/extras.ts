import { Request, Response } from "express";

// Modelos
import Personas from "../models/personas";
import Votos from "../models/votos";

// Obtener Jornadas
export async function ObtenerJornadas(
  req: Request,
  res: Response
): Promise<Response> {
  const Jornada: any = ["Diurna", "Nocturna", "Fin de Semana"];
  return res.status(200).json(Jornada);
}

// Contadores
export async function Contadores(req: Request, res: Response) {
  await Votos.find().exec(function(err, results) {
    var countVotos = results.length;

    Personas.find().exec(function(err, results) {
      var countPersonas = results.length;

      var result = (countVotos / countPersonas) * 100;

      var Porcentaje = trunc(result, 2);

      res.status(200).json({ countVotos, countPersonas, Porcentaje });
    });
  });
}

function trunc(x: any, posiciones = 0) {
  var s = x.toString();
  var l = s.length;
  var decimalLength = s.indexOf(".") + 1;

  if (l - decimalLength <= posiciones) {
    return x;
  }
  // Parte decimal del número
  var isNeg = x < 0;
  var decimal = x % 1;
  var entera = isNeg ? Math.ceil(x) : Math.floor(x);
  // Parte decimal como número entero
  // Ejemplo: parte decimal = 0.77
  // decimalFormated = 0.77 * (10^posiciones)
  // si posiciones es 2 ==> 0.77 * 100
  // si posiciones es 3 ==> 0.77 * 1000
  var decimalFormated = Math.floor(
    Math.abs(decimal) * Math.pow(10, posiciones)
  );
  // Sustraemos del número original la parte decimal
  // y le sumamos la parte decimal que hemos formateado
  var finalNum =
    entera + (decimalFormated / Math.pow(10, posiciones)) * (isNeg ? -1 : 1);

  return finalNum;
}
