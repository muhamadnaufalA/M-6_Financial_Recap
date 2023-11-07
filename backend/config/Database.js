import { Sequelize } from "sequelize";

const db = new Sequelize('financial_report', 'postgres', '4321', {
    host: 'localhost',
    dialect: 'postgres', // Menggunakan PostgreSQLA
    port: 5432, // Port default PostgreSQL
})

export default db;
