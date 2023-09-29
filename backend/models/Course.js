

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
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
    });

    // Define associations (Course has many CourseRoles)

    return Course;
};
