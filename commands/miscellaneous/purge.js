const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "purge",
        aliases: ["c", "clear", "ㅊ", "청소"],
        description: "채팅창 청소",
        usage: "clear <삭제 할 메세지 갯수>",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    notper: (message) => {
        let embed = new MessageEmbed()
            embed.setColor(bot.colours.red_light)
            embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            embed.setDescription("권한이 없어서 실행할 수 없어요!")
        message.channel.send({ embed: embed })
    },
    wrongcmd: (message, input) => {
        let embed = new MessageEmbed()
            embed.setColor(bot.colours.red_light)
            embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            embed.setDescription(input + " 가 올바른 명령어에요!")
        message.channel.send({ embed: embed })
    },
    run: async (bot, message, args) => {
        let purge = parseInt(args[0])+1;
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return module.exports.notper(message)
        if (!purge || purge > 100) return module.exports.wrongcmd(message, bot.prefix+"청소 [1~100]")
        // if (isNaN(purge) == true || message.content.indexOf('.') != -1) return module.exports.wrongcmd(message, bot.prefix+"청소 [1~100]")
        try {
            message.channel.bulkDelete(purge)
            message.channel.send(`<@${message.author.id}> ${purge}개의 메세지를 삭제하였습니다!`).then(msg => msg.delete({ timeout: 3000 }))
        } catch (error) {
            message.channel.send(`<@${message.author.id}> :< 오류가 발생했어요..`)
        }
    }
}