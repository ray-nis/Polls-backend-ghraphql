const { Sequelize, DataTypes } = require("sequelize")
const initData = require("../dataSeeder")

const sequelize = new Sequelize("poll", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging: false, 
})

const db = {
}

db.User = require("./user.model")(sequelize, DataTypes),
db.Poll = require("./poll.model")(sequelize, DataTypes),
db.PollOption = require("./pollOption.model")(sequelize, DataTypes),
db.Vote = require("./vote.model")(sequelize, DataTypes, db.PollOption),

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize.authenticate()
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("There was an error connecting to the db :\n" + err))

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database synced successfully")
        initData(db)
    })
    .catch(err => console.error("There was an error syncing to the db :\n" + err))

module.exports = db