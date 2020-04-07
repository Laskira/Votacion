import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
var bodyParser = require('body-parser');

//Rutas
import Routes from './router/index'

// Inicialización
const app: Application = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);

// Middlewares

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas
app.use('', Routes);

// Carpeta de Archivos Subidos
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;