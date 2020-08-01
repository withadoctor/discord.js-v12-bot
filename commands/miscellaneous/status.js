const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "status",
        aliases: ["상태"],
        description: "봇 상태",
        usage: "status",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        // let annch = rows[0].notice_id
        // let logch = rows[0].log_id
        // let welch = rows[0].custom_id          
        // if (annch === "1234") { annch.replace(/1234/g, "설정되어 있지않아요!") } else { global.annch = annch }
        // if (logch === "1234") { logch.replace(/1234/g, "설정되어 있지않아요!") } else { global.logch = logch }
        // if (welch === "1234") { welch.replace(/1234/g, "설정되어 있지않아요!") } else { global.welch = welch }
        let embed = new MessageEmbed()
            .setThumbnail(bot.user.avatarURL())
            .setColor("#5fe9ff")
            .setTitle(`${message.guild.name}서버 정보 및 미야 설정`)
            .addField(`접두사`, `미야야`)
        // if (annch === "설정되어 있지않아요!" || annch === "1234") { embed.addField(`공지 채널`, `설정되어 있지않아요!`, true) } else { embed.addField(`공지 채널`, `<#${annch}>`, true) }
        // if (logch === "설정되어 있지않아요!" || logch === "1234") { embed.addField(`로그 채널`, `설정되어 있지않아요!`, true) } else { embed.addField(`로그 채널`, `<#${logch}>`, true) }
        // if (welch === "설정되어 있지않아요!" || welch === "1234") { embed.addField(`입퇴장 채널`, `설정되어 있지않아요!`, true) } else { embed.addField(`입퇴장 채널`, `<#${welch}>`, true)  }
            embed.addField(`서버 오너`, `${message.guild.owner.displayName}님`, true)
                 .addField(`서버 이름`, `${message.guild.name}`, true)
                 .addField(`서버 봇 갯수`, `${message.guild.members.cache.filter(x => x.user.bot).size}개`, true)
                 .addField(`서버 역할 갯수`, `${message.guild.roles.cache.size}개`, true)
                 .addField(`서버 전체 인원`, `${message.guild.memberCount}명`, true)
        message.channel.send(embed)
    }
}