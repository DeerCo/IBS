const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/database'); // Adjust the path as per your project structure
const User = require('./user'); // Adjust the path to your User model

class UserVerification extends Model {
  // If you have any instance methods, you can define them here
}

UserVerification.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username'
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
  // Add any additional fields as needed
}, {
  sequelize,
  modelName: 'UserVerification',
  tableName: 'user_verification', // Ensure this matches your actual table name
  timestamps: false // Set to true if you have createdAt and updatedAt columns
});

// Define associations here
UserVerification.belongsTo(User, {
  foreignKey: 'username',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

module.exports = UserVerification;
