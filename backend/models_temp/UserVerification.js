

module.exports = (sequelize, DataTypes) => {
    const UserVerification = sequelize.define('UserVerification', {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true, // specifies that 'code' is the primary key
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });


    return UserVerification;
};
