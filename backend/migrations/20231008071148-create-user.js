'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // Add the foreign key constraint for UserVerification
    await queryInterface.addConstraint('Users', {
      fields: ['username'],
      type: 'foreign key',
      name: 'custom_fkey_verification_username',
      references: {
        table: 'user_verification', // The referenced table name (adjust as needed)
        field: 'username', // The referenced field name (adjust as needed)
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
    // Remove the foreign key constraint for UserVerification
    await queryInterface.removeConstraint('Users', 'custom_fkey_verification_username');
  }
};