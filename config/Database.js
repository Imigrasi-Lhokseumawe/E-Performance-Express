const { Sequelize } = require("sequelize");

const db = new Sequelize('performance_imigrasi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db