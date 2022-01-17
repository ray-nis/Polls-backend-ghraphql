const typeDef = `
    type PollOption {
        id: ID!
        text: String!
        votes: Int!
    }

    extend type Mutation {
        vote(optionId: Int!): Poll!
    }
`

const resolvers = {
    Mutation: {
        vote: async (parent, args, context) => {
            const option = await context.db.PollOption.findByPk(args.optionId)
            if (option === null) {
                throw new Error("Not found")
            }

            option.votes = option.votes + 1
            await option.save()

            return await context.db.Poll.findByPk(option.pollId)
        }
    }
}

module.exports = { typeDef, resolvers }