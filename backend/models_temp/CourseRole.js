

module.exports = (sequelize, DataTypes) => {
    const CourseRole = sequelize.define('CourseRole', {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return CourseRole;
};
