import { Sequelize } from "sequelize";
import db from "../config/Database.js";

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
})

export default JenisPengeluaran;

(async() => {
    await db.sync();
});