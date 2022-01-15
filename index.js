const { ApolloServer } = require("apollo-server")
const db = require("./models")
const schema = require("./schema/schema")

const server = new ApolloServer({ schema, context: ({ req }) => {
    return {
        ...req,
        db,
    }
} 
})

server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`)
})