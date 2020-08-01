module.exports = {
    config: {
        name: "shutdown",
        aliases: ["botstop", "sb", "봇정지"],
        description: "봇 끄기",
        usage: "shutdown",
        category: "moderation", // help에서 표시 하지 않음
        accessableby: "Bot Owner", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        if(message.author.id != bot.ownerId) return message.channel.send("You're the bot the owner!")
        try {
            await message.channel.send("Bot is shutting down...")
            process.exit()
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
    }
}