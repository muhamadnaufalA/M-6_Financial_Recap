import { Sequelize } from "sequelize";

<<<<<<< HEAD
const db = new Sequelize('financial_report', 'postgres', '123', {
=======
const db = new Sequelize('financial_report', 'postgres', '4321', {
>>>>>>> reka
    host: 'localhost',
    dialect: 'postgres', // Menggunakan PostgreSQLA
    port: 5432, // Port default PostgreSQL
})

export default db;
