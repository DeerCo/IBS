

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true, // specifies that 'username' is the primary key
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    // Define associations (User has many CourseRoles, User has one UserVerification)

    return User;
};
