module.exports = {
    config: {
        name: "reload",
        aliases: ["rl", "creload", "ㄱ", "기", "새로고침"],
        description: "봇 명령어 새로고침",
        usage: "reload",
        category: "moderation", // help에서 표시 하지 않음
        accessableby: "Bot Owner", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        if(message.author.id != bot.ownerId) return message.channel.send("You're the bot the owner!")

        try {
            ["command", "event"].forEach(x => require(`../../handlers/${x}`)(bot, true));
        } catch(e) {
            return message.channel.send(`Could not reload`)
        }

        console.log(`has been reloaded!`);
        message.channel.send(`has been reloaded!`)
    }
}