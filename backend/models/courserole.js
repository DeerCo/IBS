'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CourseRole.belongsTo(models.User, {
        foreignKey: 'username',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      });
      CourseRole.belongsTo(models.Course, {
        foreignKey: 'course_id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      });
    }
  }
  CourseRole.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'CourseRole',
  });
  return CourseRole;
};