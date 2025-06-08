/*
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, connectDatabase };

*/
import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Mantém o dotenv para facilitar o desenvolvimento local

// As variáveis de ambiente serão injetadas diretamente pelo Railway no ambiente de produção.
const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,      // Alterado de DB_NAME
    process.env.MYSQLUSER,          // Alterado de DB_USER
    process.env.MYSQL_ROOT_PASSWORD,  // Alterado de DB_PASSWORD para a senha do root
    {
        host: process.env.MYSQLHOST, // Alterado de DB_HOST
        port: process.env.MYSQLPORT, // Adicionado a porta, que é essencial
        dialect: 'mysql'
    }
);

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, connectDatabase };
