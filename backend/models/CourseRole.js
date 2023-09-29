t

module.exports = (sequelize, DataTypes) => {
    const CourseRole = sequelize.define('CourseRole', {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Define associations (CourseRole belongs to User, CourseRole belongs to Course)

    return CourseRole;
};
