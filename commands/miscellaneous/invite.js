const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "invite",
        aliases: ["초대"],
        description: "봇 초대",
        usage: "invite",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        let embed = new MessageEmbed()
            .setColor(bot.colours.orange)
            .setTitle(bot.user.username+" 초대링크")
            .setDescription("[여기](https://discord.com/oauth2/authorize?client_id=696708793710542878&permissions=8&scope=bot)를 클릭하면 초대하실 수 있어요!")

        message.channel.send(embed)
    }
}