const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "unban",
        aliases: ["ub", "unbanish", "ㅕㅠ", "밴해제"],
        description: "밴 헤제",
        usage: "unban <username> <reason>",
        category: "moderation", // help에서 표시 하지 않음
        accessableby: "Administrators", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        // message.channel.guild.fetchBans().then(res => console.log(res)) // get ban list

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        // if(isNaN(args[0])) return message.channel.send("You need to provide an ID.")
        // let bannedMember = await bot.fetchUser(args[0])
        // if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")
        var banlist = await message.channel.guild.fetchBans()
        var bannedMember = banlist.find(x => x.user.username == args[0])
        if(!bannedMember) {
            return message.channel.send("Please provide a username to unban someone!")
        }

        let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")
        // message.delete()
        try {
            message.guild.members.unban(bannedMember.user.id, reason)
            message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`)
        } catch(e) {
            console.log(e.message)
        }

        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unban")
        .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
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
