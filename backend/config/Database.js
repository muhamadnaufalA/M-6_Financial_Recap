import { Sequelize } from "sequelize";

const db = new Sequelize('financialrecapdb', 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres', // Menggunakan PostgreSQLA
    port: 5432, // Port default PostgreSQL
})

export default db;
