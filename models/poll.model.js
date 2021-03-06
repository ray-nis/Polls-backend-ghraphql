module.exports = (sequelize, DataTypes) => {
    const Poll = sequelize.define("poll", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    Poll.associate = (models) => {
        Poll.hasMany(models.PollOption, {
            forgeignKey: "pollId",
            allowNull: false
        }),
        Poll.belongsToMany(models.User, {
            through: "vote"
        })
    }
    return Poll
}