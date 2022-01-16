const typeDef = `
    type PollOption {
        id: ID!
        text: String!
        votes: Int!
    }
`

const resolvers = {
}

module.exports = { typeDef, resolvers }