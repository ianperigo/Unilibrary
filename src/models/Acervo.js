import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

// ORM
class Acervo extends Model {}

Acervo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.CHAR(255),
        allowNull: false
    },
    autor: {
        type: DataTypes.CHAR(255),
        allowNull: false
    },
    edicao: {
        type: DataTypes.CHAR(50),
        allowNull: true
    },
    ano_publicacao: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    categoria: {
        type: DataTypes.ENUM('Livro','Artigo','Revista'),
        allowNull: false
    },
    genero: {
        type: DataTypes.CHAR(50),
        allowNull: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tipo: {
        type: DataTypes.ENUM('fisico', 'virtual'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Acervo',
    tableName: 'exemplares',
    timestamps: false
});

export default Acervo;