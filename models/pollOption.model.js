module.exports = (sequelize, DataTypes) => {
    const PollOption = sequelize.define("pollOption", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        votes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    })
    return PollOption
}