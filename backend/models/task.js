'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
      Task.belongsTo(TaskGroup, { foreignKey: 'task_group_id', as: 'taskGroup' });
    }
  }
  task.init({
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    long_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};