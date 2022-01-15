module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Poll, {
            foreignKey: "author",
            allowNull: false,
        })
    }
    return User
}