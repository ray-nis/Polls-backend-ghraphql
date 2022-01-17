const isLoggedIn = ctx => {
    if (ctx.user === null) throw new Error("You must be logged in to do this")
    return ctx.user
}

const directiveResolvers = {
    isAuthenticated: (next, source, args, ctx) => {
        isLoggedIn(ctx)
        return next()
    },
}

module.exports = { directiveResolvers }