import crypto from 'crypto';
import jwt from 'jsonwebtoken';

class AuthController {
    constructor(UserModel) {
        this.UserModel = UserModel; // Armazena o modelo
    }

    // Função para gerar o hash da senha
    gerarSenhaHash(senha) {
        return crypto.createHash('sha256').update(senha).digest('hex');
    }

    async register(req, res) {
        const { email, password, primeiro_nome, ultimo_nome, instituicao, vinculo, numero_matricula, vinculo_ativo } = req.body;

        // Validação de campos obrigatórios
        if (!email || !password || !primeiro_nome || !ultimo_nome || !numero_matricula || !vinculo) {
            return res.status(400).json({ message: 'Campos obrigatórios estão faltando' });
        }

        try {
            // Verifica se o usuário já existe
            const existingUser = await this.UserModel.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }

            // Gera o hash da senha
            const passwordHash = this.gerarSenhaHash(password);

            // Cria o novo usuário
            const newUser = await this.UserModel.create({
                email,
                senha_hash: passwordHash,
                primeiro_nome,
                ultimo_nome,
                instituicao,
                vinculo,
                numero_matricula,
                vinculo_ativo: vinculo_ativo || 1 // Define como ativo por padrão, se não for fornecido
            });

            res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
        } catch (error) {
            console.error('Erro ao registrar usuário:', error); // Log detalhado no console
            res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message || error });
        }
    }

    
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        try {
            const user = await this.UserModel.findOne({ where: { email } });
            if (!user || user.senha_hash !== this.gerarSenhaHash(password)) {
                return res.status(401).json({ message: 'Email ou senha inválidos' });
            }

            // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // payload
            process.env.JWT_SECRET || 'seusegredoaqui', // segredo
            { expiresIn: '1h' } // tempo de expiração
        );

        res.json({
            message: 'Usuário autenticado com sucesso',
            token, // retorna o token
            usuario: {
                primeiro_nome: user.primeiro_nome,
                ultimo_nome: user.ultimo_nome,
                email: user.email,
                instituicao: user.instituicao,
                vinculo: user.vinculo,
                matricula: user.numero_matricula
            }
        });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao autenticar usuário', error });
        }
    }
}

export default AuthController;