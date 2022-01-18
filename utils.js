const jwt = require("jsonwebtoken")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const getUser = async (req, db) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
        let decodedToken = null
        try {
            decodedToken = jwt.verify(auth.substring(7), "SECRET")
        } catch (err) {
            return null 
        }
        const currentUser = await db.User.findByPk(decodedToken.id)
        return currentUser
    }
    return null
}

module.exports = { getUser, pubsub }