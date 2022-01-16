const typeDef = `
    extend type Query {
        users: [User!]!
        user(id: Int!): User
    }

    type User {
        id: ID!
        username: String!
        pollsPosted: [Poll!]!
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
    },
    User: {
        pollsPosted: async (parent, args, context) => {
            return await context.db.Poll.findAll({ 
                where: {
                    author: parent.id
                }
            })
        }
    }
}

module.exports = { typeDef, resolvers }