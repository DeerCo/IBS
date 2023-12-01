'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mark.belongsTo(Criteria, { foreignKey: 'criteria_id', as: 'criteria' });
      Mark.belongsTo(User, { foreignKey: 'username', as: 'user' });
      Mark.belongsTo(Task, { foreignKey: 'task', as: 'task' });
    }
  }
  mark.init({
    mark: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    old_mark: {
      type: DataTypes.NUMERIC,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'mark',
  });
  return mark;
};