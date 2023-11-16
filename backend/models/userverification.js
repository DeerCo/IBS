'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserVerification.belongsTo(models.User, {
        foreignKey: 'username',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      });
    }
  }
  UserVerification.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    sequelize,
    modelName: 'UserVerification',
    tableName: 'UserVerification',
  });
  return UserVerification;
};