import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Wallet from "./WalletModel.js";

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
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

User.hasMany(Income);
Income.belongsTo(User);

Wallet.hasMany(Income);
Income.belongsTo(Wallet);

export default Income;

(async() => {
    await db.sync();
});