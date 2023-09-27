import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

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
        type: DataTypes.STRING(16),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

User.hasMany(Income);
Income.belongsTo(User);

export default Income;

(async() => {
    await db.sync();
});