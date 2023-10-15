import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize

const BudgetRule = db.define('budgetrules', {
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    percentage: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

User.hasMany(BudgetRule);
BudgetRule.belongsTo(User);

export default BudgetRule;

(async() => {
    await db.sync();
});