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
        primaryKey: true,
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    // For the 'course_id' foreign key
    await queryInterface.addConstraint('course_role', {
      fields: ['course_id'],
      type: 'foreign key',
      name: 'fkey_course_id',
      references: {
        table: 'Courses',
        field: 'course_id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};