import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path'; // 1. Importe o módulo 'path'
import { fileURLToPath } from 'url'; // 2. Importe o helper 'fileURLToPath'

import { setAcervoRoutes } from './routes/acervoRoutes.js';
import { setAuthRoutes } from './routes/authRoutes.js';
import { connectDatabase } from './config/database.js';

// Helper para obter o __dirname em projetos ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDatabase();

// 3. Middleware para servir arquivos estáticos da pasta 'public'
// Esta linha deve vir antes das suas rotas de API
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setAcervoRoutes(app);
setAuthRoutes(app);

// 4. A rota antiga para '/' foi removida.
// O express.static agora cuidará de servir o 'index.html' quando
// alguém acessar a raiz do site.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;