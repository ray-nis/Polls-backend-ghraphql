const { ApolloServer } = require("apollo-server")
const db = require("./models")
const schema = require("./schema/schema")
const { getUser } = require("./utils")

const server = new ApolloServer({ schema, context: async ({ req }) => {
    const user = await getUser(req, db)
    return {
        ...req,
        db,
        user: user
    }
} 
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server started at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})