const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Users = require("./UserModel.js")

const {DataTypes} = Sequelize;

const Lalintalkim = db.define('lalintalkim', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    kegiatan: DataTypes.STRING,
    jumlah: DataTypes.STRING,
    output: DataTypes.STRING,
    anggaran: DataTypes.STRING,
    sisaAnggaran: DataTypes.STRING,
    periode: DataTypes.STRING,
    isAccept: DataTypes.BOOLEAN,
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

Users.hasMany(Lalintalkim);
Lalintalkim.belongsTo(Users, {foreignKey: 'userId'})

module.exports = Lalintalkim;

(async()=> {
    await db.sync();
})();