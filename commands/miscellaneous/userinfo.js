const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "userinfo",
        aliases: ["i", "ui", "ㅕㅑ", "ㅑ", "내정보"],
        description: "내정보보기",
        usage: "userinfo",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        let uEmbed = new MessageEmbed()
            .setColor(bot.colours.red_light)
            .setTitle("User Info")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
            .addField("**유저명:**", `${message.author.username}`, true)
            .addField("**태그:**", `${message.author.discriminator}`, true)
            .addField("**ID:**", `${message.author.id}`, true)
            .addField("**상대:**", `${message.author.presence.status}`, true)
            .addField("**계정 생성일:**", `${message.author.createdAt}`, true)
            // .setFooter(`TestBot | Footer`, bot.user.displayAvatarURL);

        message.channel.send(uEmbed);
    }
}
