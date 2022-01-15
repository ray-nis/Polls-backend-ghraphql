const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("poll", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging: false, 
})

const db = {
    User: require("./user.model")(sequelize, DataTypes)
}

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize.authenticate()
    .then(() => console.log("Successful connection to database"))
    .catch( err => console.error("There was an error connething to the db :\n" + err))

sequelize.sync({ force: true })
    .then(async () => {
        console.log("Synced")
    })
    .catch((err) => {
        console.error(err)
    })

module.exports = db