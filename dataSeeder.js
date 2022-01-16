const bcrypt = require("bcrypt")

const initData = async db => {
    for (let i = 1; i < 6; i++) {
        await db.User.create({ username: "username" + i, password: await bcrypt.hash("password", 10)})
    }
    const randomUser = await db.User.findOne({ where: { username: "username1" } })


    for (let i = 1; i < 4; i++) {
        await db.Poll.create({
            title: "Poll number" + i,
            author: randomUser.id,
            pollOptions: [
                { text: "Choice 1 for poll " + i},
                { text: "Choice 2 for poll " + i}
            ]
        }, { include: [ db.PollOption ] })
    }

    console.log("Data seeded successfully")
}

module.exports = initData