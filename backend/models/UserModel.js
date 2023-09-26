import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users', {
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    password: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
}, {
    freezeTableName: true
});

export default User;

(async() => {
    await db.sync();
})();

