import { connect } from 'mongoose'

export async function startConnection() {
    const db = await connect('mongodb://localhost/Sena_Votacion',{
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('Base de Datos Conectada');
}
