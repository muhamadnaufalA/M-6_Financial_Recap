import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Outcome = db.define('outcomes', {
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    nominal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanggal_pengeluaran: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Outcome;

(async() => {
    await db.sync();
});