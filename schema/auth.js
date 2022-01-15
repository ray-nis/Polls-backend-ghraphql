const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const typeDef = `
    type AuthPayload {
        token: String
    }
    
    type Mutation {
        register(username: String!, password: String!): AuthPayload
        login(username: String!, password: String!): AuthPayload
    }
`

const resolvers = {
    Mutation: {
        register: async (parent, args, context) => {
            try {
                const passwordHash = await bcrypt.hash(args.password, 10)
                const user = await context.db.User.create({
                    username: args.username,
                    password: passwordHash
                })

                const token = jwt.sign({ id: user.id, username: user.username }, "SECRET", { expiresIn: 60*60 })
                return {
                    token: token
                }
            } catch (err) {
                console.error(err)
            }
        },
        login: (parent, args, context) => {

        },
    }
}

module.exports = { typeDef, resolvers }