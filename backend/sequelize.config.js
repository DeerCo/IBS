const Sequelize = require('sequelize');

module.exports = {
    development: {
        username: 'postgres', // PostgreSQL username
        password: 'password', // PostgreSQL password
        database: 'ibs', // PostgreSQL database name
        host: 'localhost', // PostgreSQL host (usually 'localhost')
        dialect: 'postgres',
    },
};
