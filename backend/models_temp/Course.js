'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Course.init(
        {
            course_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            course_session: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gitlab_group_id: {
                type: DataTypes.STRING,
                unique: true,
            },
            default_token_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            token_length: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            hidden: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: 'Course',
        });
    return Course;
};