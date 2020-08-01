const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "kick",
        aliases: ["k", "ㅏ", "강퇴", "추방"],
        description: "특정유저 추방",
        usage: "kick <@username>",
        category: "moderation", // help에서 표시 하지 않음
        accessableby: "Moderator", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
        if(!kickMember) return message.channel.send("Please provide a user to kick!")

        let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

        if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

        kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() => 
        kickMember.kick()).catch(err => console.log(err))

        message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000))

        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "kick")
        .addField("Mutee:", kickMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

        try {
            let sChannel = message.guild.channels.cache.find(c => c.name == bot.warningCh)
            sChannel.send(embed)
        } catch (error) {
            console.log(bot.warningCh+"채널이 없어서 메세지를 못 보냅니다.");
            message.channel.send(embed)
        }
    }
}