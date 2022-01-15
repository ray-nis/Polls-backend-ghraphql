const typeDef = `
    extend type Query {
        polls: Int!
    }

    type Poll {
        id: ID!
        title: String!
    }
`

const resolvers = {
    Query: {
        polls: () => 35
    }
}

module.exports = { typeDef, resolvers }