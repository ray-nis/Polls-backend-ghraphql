const typeDef = `
    extend type Query {
        users: [User!]!
        user(id: Int!): User
    }

    type User {
        id: ID!
        username: String!
    }
`

const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            return await context.db.User.findAll()
        },
        user: async (parent, args, context) => {
            const user = await context.db.User.findByPk(args.id)
            if (user === null) {
                throw new Error(`User with id ${args.id} is not found`)
            }
            return user
        }
    }
}

module.exports = { typeDef, resolvers }