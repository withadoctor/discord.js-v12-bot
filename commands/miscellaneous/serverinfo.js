const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "serverinfo",
        aliases: ["si", "serverdesc", "네", "ㄴㄷㄱㅍㄷ갸ㅜ래", "서버인포", "서버"],
        description: "서버 정보",
        usage: "serverinfo",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        let sEmbed = new MessageEmbed()
            .setColor(bot.colours.cyan)
            .setTitle("Server Info")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .addField("**Guild Name:**", `${message.guild.name}`, true)
            .addField("**Guild Owner:**", `${message.guild.owner}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Role Count:**", `${message.guild.roles.size}`, true)
            // .setFooter(`TestBot | Footer`, bot.user.displayAvatarURL);
        message.channel.send(sEmbed);
    }
}