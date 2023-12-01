'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        // Seed a test admin user
        await queryInterface.bulkInsert('user_info', [{
            username: 'testAdmin',
            password: bcrypt.hashSync('testPassword', 8),
            email: 'testAdmin@example.com',
            admin: true // Set as admin
            // include other necessary fields based on your schema
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user_info', { username: 'testAdmin' }, {});
    }
};
