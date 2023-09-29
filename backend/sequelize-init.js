const Sequelize = require('sequelize');
const config = require('./sequelize.config');

const sequelize = new Sequelize(config.development);

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
