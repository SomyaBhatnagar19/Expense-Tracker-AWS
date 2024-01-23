/* /backend/util/database.js */

//connecting to the mysql database
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    database: 'expense-tracker-aws',
    username: 'root',
    password: 'Somya@1901b',
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = sequelize;