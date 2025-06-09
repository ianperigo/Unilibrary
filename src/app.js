import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { setAcervoRoutes } from './routes/acervoRoutes.js';
import { setAuthRoutes } from './routes/authRoutes.js';
import { connectDatabase } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDatabase();

// --- LOGS PARA DEBUG ---
console.log('--- INICIANDO DEBUG DE CAMINHOS ---');
console.log('Diretório atual (__dirname):', __dirname);
// Sobe um diretório ('..') a partir de /src e depois entra em /public
const publicPath = path.join(__dirname, '..', 'public');
console.log('Caminho completo para a pasta public:', publicPath);
console.log('--- FIM DO DEBUG DE CAMINHOS ---');
// --- FIM DOS LOGS ---

app.use(express.static(publicPath));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setAcervoRoutes(app);
setAuthRoutes(app);

// --- ROTA DE DEBUG TEMPORÁRIA ---
// Reativamos esta rota para ter certeza de que o servidor está respondendo
// enquanto depuramos o problema dos arquivos estáticos.
app.get('/', (req, res) => {
    res.send('Servidor no ar, mas o arquivo estático não foi encontrado. Verifique os logs do Railway.');
});
// --- FIM DA ROTA DE DEBUG ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;