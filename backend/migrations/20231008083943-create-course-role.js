'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('course_role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
    // For the 'course_id' foreign key
    await queryInterface.addConstraint('course_role', {
      fields: ['course_id'],
      type: 'foreign key',
      name: 'fkey_course_id',
      references: {
        table: 'courses',
        field: 'course_id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    // Add foreign key for 'username'
    await queryInterface.addConstraint('course_role', {
      fields: ['username'],
      type: 'foreign key',
      name: 'fkey_username',
      references: {
        table: 'user_info', // Replace with the actual name of your User table
        field: 'username',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};