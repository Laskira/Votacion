import { Schema, model, Document } from "mongoose";

const Votos = new Schema({
  IdPersona: {
    type: Schema.Types.String,
    unique: true,
    required: true
  },
  IdCandidato: {
    type: Schema.Types.ObjectId,
    ref: "Candidatos"
  }
});
export interface IVoto extends Document {
  IdPersona: object;
  IdCandidatos: object;
}
export default model<IVoto>("Votos", Votos);
