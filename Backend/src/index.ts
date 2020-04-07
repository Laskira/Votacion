import app from './app';
import { startConnection } from './database'

async function main() {
    startConnection();
    await app.listen(app.get('port'));
    console.log('Servidor en el Puerto', app.get('port'));
}

main();