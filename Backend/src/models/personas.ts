import { Schema, model, Document } from "mongoose";

const Personas = new Schema({
  Documento: {
    type: String,
    unique: true,
    required: true
  },
  Nombres: {
    type: String,
    required: true
  },
  P_Apellido: {
    type: String,
    required: true
  },
  S_Apellido: {
    type: String,
    required: true
  },
});

export interface IPersonas extends Document {
  Documento: string;
  Nombres: string;
  P_Apellido: string;
  S_Apellido: string;
}

export default model<IPersonas>("Personas", Personas);
