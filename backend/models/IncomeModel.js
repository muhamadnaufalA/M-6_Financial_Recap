import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Income = db.define('incomes', {
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanggal_pemasukan: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Income;

(async() => {
    await db.sync();
});