const { MessageEmbed } = require('discord.js')

module.exports = { 
    config: {
        name: "profile",
        aliases: ["프로필"],
        description: "프로필 사진을 보여줍니다.",
        usage: "profile",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        const user = message.mentions.users.first() || message.author
        if (!user) {
            let embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
                .setColor(bot.colours.cyan)
                .setFooter("기본 프로필 일 경우 사진이 보이지 않아요!")
            message.channel.send(embed)
        }
        let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setColor(bot.colours.cyan)
            .setFooter("기본 프로필 일 경우 사진이 보이지 않아요!")
        message.channel.send(embed)
    }
}