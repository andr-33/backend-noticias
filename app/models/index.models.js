const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PSW,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

db.user = require('./user.model')(connection, Sequelize);
db.news = require('./news.model')(connection, Sequelize);

module.exports = db;
