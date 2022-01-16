const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserInputError } = require("apollo-server")

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
                throw new UserInputError(err.errors[0].message)
            }
        },
        login: async (parent, args, context) => {
            try {
                const user = await context.db.User.findOne({ where: { username: args.username }})
                const passwordCorrect = user === null ? false : await bcrypt.compare(args.password, user.password)
                
                if (!(user && passwordCorrect)) {
                    throw new Error("Invalid details")
                }
                
                const token = jwt.sign({ id: user.id, username: user.username }, "SECRET", { expiresIn: 60*60 })
                return {
                    token: token
                }
            } catch (err) {
                console.error(err)
                throw new Error(err.message)
            }
        },
    }
}

module.exports = { typeDef, resolvers }