const { makeExecutableSchema } = require("apollo-server")
const lodash = require("lodash")
const { typeDef: Poll, resolvers: pollResolver } = require("./poll")
const { typeDef: PollOption, resolvers: pollOptionResolver } = require("./pollOption")
const { typeDef: Auth, resolvers: authResolver } = require("./auth")
const { typeDef: User, resolvers: userResolver } = require("./user")

const Query = `
    type Query {
        _empty: String
    }
`

const resolvers = {}

module.exports = makeExecutableSchema({
    typeDefs: [ Query, Poll, Auth, User, PollOption ],
    resolvers: lodash.merge(resolvers, pollResolver, authResolver, userResolver, pollOptionResolver),
})