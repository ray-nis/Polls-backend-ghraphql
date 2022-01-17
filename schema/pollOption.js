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
            const vote = await context.db.Vote.findOne({ 
                where: { userId: 3, pollId: option.pollId } 
            })
            if (vote !== null) {
                throw new Error("You've already cast a vote for this poll")
            }

            option.votes = option.votes + 1
            await option.save()
            await context.db.Vote.create({
                userId: 3, // TODO CURRENT USER
                pollId: option.pollId,
                choiceId: option.id
            })

            return await context.db.Poll.findByPk(option.pollId)
        }
    }
}

module.exports = { typeDef, resolvers }