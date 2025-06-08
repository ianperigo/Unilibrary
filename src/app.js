
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // 1. Importe o pacote
import { setAcervoRoutes } from './routes/acervoRoutes.js';
import { setAuthRoutes } from './routes/authRoutes.js';
import { connectDatabase } from './config/database.js';

const app = express();

connectDatabase();

// 2. Habilite o CORS para todas as origens
// Para um ambiente de produção, considere restringir o acesso:
// app.use(cors({ origin: 'https://seu-dominio.com' }));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setAcervoRoutes(app);
setAuthRoutes(app);

app.get('/', (req, res) => {
    res.send('Welcome to UniLibrary API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
