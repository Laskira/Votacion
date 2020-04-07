import { Schema, model, Document } from "mongoose";

const Candidatos = new Schema({
  Foto: {
    type: String,
    required: true
  },
  NombreC: {
    type: String,
    required: true
  },
  Jornada: {
    type: String,
    required: true
  },
  CantVoto: {
    type: Number,
    default: 0
  },
  Targeton: {
    type: Schema.Types.String,
    unique: true,
    required: true
  },
  Lema: {
    type: String,
    required: false
  }
});
export interface ICandidatos extends Document {
  Foto: string;
  NombreC: string;
  Jornada: string;
  CantVoto: number;
  Targeton: string;
  Lema: string;
}

export default model<ICandidatos>("Candidatos", Candidatos);
