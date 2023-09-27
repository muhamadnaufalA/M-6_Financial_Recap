import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Wallet = db.define('wallets', {
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default Wallet;

(async() => {
    await db.sync();
});