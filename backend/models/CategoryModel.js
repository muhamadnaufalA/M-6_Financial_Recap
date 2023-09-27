import { Sequelize } from "sequelize";
import db from "../config/Database.js";

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

export default Category;

(async() => {
    await db.sync();
});