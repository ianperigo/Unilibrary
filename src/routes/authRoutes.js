import express from 'express';
import AuthController from '../controllers/authController.js';
import UserModel from '../models/Usuario.js';
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router(); // <-- Adicione esta linha

router.get('/protegido', autenticarToken, (req, res) => {
    res.json({ message: 'Acesso autorizado!', user: req.user });
});

const setAuthRoutes = (app) => {
    const authController = new AuthController(UserModel); 

    router.post('/login', authController.login.bind(authController));
    router.post('/register', authController.register.bind(authController));

    app.use('/', router); // <-- Use o router na aplicação
};

export { setAuthRoutes };