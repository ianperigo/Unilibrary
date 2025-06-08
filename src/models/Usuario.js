import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';


//ORM
const UserModel = sequelize.define('usuarios', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email: {
        type: DataTypes.CHAR(100),
        allowNull: false,
        unique: true
    },
    senha_hash: {
        type: DataTypes.CHAR(255),
        allowNull: false
    },
    primeiro_nome: {
        type: DataTypes.CHAR(100),
        allowNull: false
    },
    ultimo_nome: {
        type: DataTypes.CHAR(100),
        allowNull: false
    },
    instituicao: {
        type: DataTypes.CHAR(100),
        allowNull: true
    },
    vinculo_ativo: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    numero_matricula: {
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    vinculo: {
        type: DataTypes.ENUM('Aluno', 'Professor', 'Pesquisador','Técnico','Bibliotecário','Administrador'),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false // Desativa as colunas createdAt e updatedAt
});


export default UserModel;