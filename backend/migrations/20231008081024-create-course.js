'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   type: Sequelize.INTEGER,
      // },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      course_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_session: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gitlab_group_id: {
        type: Sequelize.STRING,
        unique: true,
      },
      default_token_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      token_length: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      hidden: {
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
    // Add the foreign key constraint
    await queryInterface.addConstraint('Courses', {
      fields: ['course_id'],
      type: 'foreign key',
      name: 'custom_fkey_course_id',
      references: {
        table: 'Courses', // The referenced table name (should match your model name)
        field: 'course_id', // The referenced field name (should match your model)
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
    // Remove the foreign key constraint
    await queryInterface.removeConstraint('Courses', 'custom_fkey_course_id');
  }
};