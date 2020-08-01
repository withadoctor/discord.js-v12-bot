const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "unmute",
        aliases: ["um", "speak", "ㅕㅡ", "뮤트해제"],
        description: "채팅금지&노래금지 해제.",
        usage: "unmute <@username> <reason>",
        category: "moderation", // help에서 표시 하지 않음
        accessableby: "Members", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

        //define the reason and unmutee
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!mutee) return message.channel.send("Please supply a user to be muted!");

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given"

        //define mute role and if the mute role doesnt exist then send a message
        let muterole = message.guild.roles.cache.find(r => r.name == "Muted")
        if(!muterole) return message.channel.send("There is no mute role to remove!")

        //remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
        mutee.roles.remove(muterole.id).then(() => {
            // message.delete()
            mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
            message.channel.send(`${mutee.user.username} was unmuted!`)
        })

        //send an embed to the modlogs channel
        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unmute")
        .addField("Mutee:", mutee.user.username)
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