import express from 'express';
import AcervoController from '../controllers/acervoController.js';

import Acervo from '../models/Acervo.js'
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
const acervoController = new AcervoController(Acervo);

const setAcervoRoutes = (app) => {
    app.use('/acervo', router);

    router.post('/', autenticarToken, acervoController.createAcervo.bind(acervoController));
    router.get('/', autenticarToken, acervoController.getAcervos.bind(acervoController));
    router.patch('/:id', autenticarToken, acervoController.updateAcervo.bind(acervoController));
    router.delete('/:id', autenticarToken, acervoController.deleteAcervo.bind(acervoController));
};

export { setAcervoRoutes };