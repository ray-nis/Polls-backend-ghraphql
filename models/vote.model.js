module.exports = (sequelize, DataTypes, PollOption) => {
    const Vote = sequelize.define("vote", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        choiceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PollOption,
                key: "id"
            }
        },
    })
    return Vote
}