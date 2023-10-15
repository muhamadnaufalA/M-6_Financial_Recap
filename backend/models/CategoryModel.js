import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import BudgetRule from "./BudgetRuleModel.js";

const {DataTypes} = Sequelize;

const Category = db.define('categories', {
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

User.hasMany(Category);
Category.belongsTo(User);

BudgetRule.hasMany(Category);
Category.belongsTo(BudgetRule);

export default Category;

(async() => {
    await db.sync();
});