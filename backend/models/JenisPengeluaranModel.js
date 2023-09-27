import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize

const JenisPengeluaran = db.define('jenis_pengeluaran', {
    nama: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    persentase: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

User.hasMany(JenisPengeluaran);
JenisPengeluaran.belongsTo(User);

export default JenisPengeluaran;

(async() => {
    await db.sync( { force: true } );
});