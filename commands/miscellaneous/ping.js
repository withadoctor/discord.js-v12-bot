module.exports = { 
    config: {
        name: "ping",
        aliases: ["p", "ㅔ", "ㅔㅑㅜㅎ", "핑"],
        description: "핑 상태",
        usage: "ping",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            let choices = ["Is this really my ping", "Is it okay? I cant look", "I hope it isnt bad"]
            let response = choices[Math.floor(Math.random() * choices.length)]

            m.edit(`${response}: Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(bot.ws.ping)}ms\``)
        })
    }
}