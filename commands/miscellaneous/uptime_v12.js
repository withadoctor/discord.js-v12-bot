const ms = require('ms');

module.exports = {
    config: {
        name: "uptime2",
        aliases: ["ut2", "셔2", "업타임2"],
        description: "봇 업타임",
        usage: "uptime2",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        message.channel.send(`My uptime is \`${ms(bot.uptime, { long: true })}\``);
    }
}
