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
      mark.belongsTo(Criteria, { foreignKey: 'criteria_id', as: 'criteria' });
      mark.belongsTo(User, { foreignKey: 'username', as: 'user' });
    }
  }
  mark.init({
    mark: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    oldMark: {
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