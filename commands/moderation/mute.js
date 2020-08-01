const { MessageEmbed, MessageManager, BitField } = require("discord.js")

module.exports = {
    config: {
        name: "mute",
        aliases: ["m", "nospeak", "ㅡ", "ㅡㅕㅅㄷ", "뮤트", "닥쳐", "닥처", "아닥"],
        description: "Mutes a member in the discord!",
        usage: "mute <@username> <reason>",
        category: "moderation", // help에서 표시 하지 않음
        accessableby: "Members", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

        //define the reason and mutee
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!mutee) return message.channel.send("Please supply a user to be muted!");

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given"

        //define mute role and if the mute role doesnt exist then create one
        let muterole = message.channel.guild.roles.cache.find(r => r.name == "Muted")
        // console.log(muterole.permissions);
        if(!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name:"Muted",
                        color: bot.colours.red_dark,
                    },
                    reason: reason,
                })
                muterole.setPermissions(new BitField(0)); // 어떤 권한도 없는 상태
                message.guild.channels.cache.forEach(async (channel, id) => { // 채널에서 muted 권한에게 아무 것도 안 주게 함.
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })
            } catch(e) {
                console.log(e.stack);
            }
        }

        //add role to the mentioned user and also send the user a dm explaing where and why they were muted
        mutee.roles.add(muterole.id).then(() => {
            // message.delete()
            mutee.send(`Hello, you have been in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
            message.channel.send(`${mutee.user.username} was successfully muted.`)
        })

        //send an embed to the modlogs channel
        let embed = new MessageEmbed()
            .setColor(bot.colours.redlight)
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .addField("Moderation:", "mute")
            .addField("Mutee:", mutee.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        try {
            let sChannel = message.guild.channels.cache.find(c => c.name == bot.warningCh)
            sChannel.send(embed)
        } catch (error) {
            console.log(bot.warningCh+"채널이 없어서 메세지를 못 보냅니다.");
            // message.channel.send(embed)
        }
    }
}