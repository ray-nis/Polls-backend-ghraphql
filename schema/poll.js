const typeDef = `
    extend type Query {
        polls: [Poll!]!
        poll(id: Int!): Poll
    }

    type Poll {
        id: ID!
        title: String!
        author: User!
        options: [PollOption!]!
    }

    extend type Mutation {
        createPoll(title: String!, options: [String!]): Poll! @isAuthenticated
    }
`

const resolvers = {
    Query: {
        polls: async (parents, args, context) => {
            return await context.db.Poll.findAll()
        },
        poll: async (parents, args, context) => {
            const poll = await context.db.Poll.findByPk(args.id)
            if (poll === null) {
                throw new Error(`Poll with id ${args.id} is not found`)
            }
            return poll
        }
    },
    Mutation: {
        createPoll: async (parent, args, context) => {
            return await context.db.Poll.create({
                title: args.title,
                author: context.user.id,
                pollOptions: args.options.map(e => {
                    return { text: e }
                })
            }, { include: [ context.db.PollOption ] })
        }
    },
    Poll: {
        author: async (parents, args, context) => {
            return await context.db.User.findByPk(parents.author) 
        },
        options: async (parents, args, context) => {
            return await context.db.PollOption.findAll({
                where: {
                    pollId: parents.id
                }
            })
        }
    }
}

module.exports = { typeDef, resolvers }