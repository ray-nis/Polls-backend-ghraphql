const { makeExecutableSchema } = require("apollo-server")
const lodash = require("lodash")
const { typeDef: Poll, resolvers: pollResolver } = require("./poll")

const Query = `
  type Query {
    _empty: String
  }
`

const resolvers = {}

module.exports = makeExecutableSchema({
    typeDefs: [ Query, Poll ],
    resolvers: lodash.merge(resolvers, pollResolver),
})