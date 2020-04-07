import { Schema, model, Document } from "mongoose";

const Permisos = new Schema({
  Documento: {
    type: String,
    unique: true,
    required: true
  },
  NombreP: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

export interface IPermisos extends Document {
  Documento: string;
  NombreP: string;
  Password: string;
}

export default model<IPermisos>("Permisos", Permisos);
