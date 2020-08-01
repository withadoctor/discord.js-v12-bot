const { MessageEmbed } = require('discord.js')

module.exports = { 
    config: {
        name: "ping2",
        aliases: ["p2", "ㅔ2", "ㅔㅑㅜㅎ2", "핑2"],
        description: "핑 상태",
        usage: "ping2",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        let pp = await message.channel.send('계산중이에요...')
        let msgp = "메세지 핑:"
        let p = "현재 "+ bot.user.username +"의 핑!"
        let api = "지연시간 :"
        let upt = "업타임 :"
        String.prototype.toHHMMSS = function() {
            let sec_num = parseInt(this, 10)
            let hours = Math.floor(sec_num / 3600)
            let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
            let seconds = sec_num - (hours * 3600) - (minutes * 60)
    
            if(hours < 10) hours = "0" + hours
            if(minutes < 10) minutes = "0" + minutes
            if(seconds < 10) seconds = "0" + seconds
    
            let time = `${hours}시간 ${minutes}분 ${seconds}초`
            return time
        }
        let time = process.uptime()
        let uptime = (time + "").toHHMMSS()
        
        let pingembed = new MessageEmbed()
            .setTitle(p)
            .setColor(bot.colours.blue_light)
            .setDescription(`${msgp} \`\`${pp.createdTimestamp - message.createdTimestamp}ms\`\`\n${api} \`\`${Math.round(bot.ws.ping)}ms\`\`\n${upt} \`\`${uptime}\`\``)
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp()
        pp.edit("현재 "+bot.user.username+"의 핑이에요!", { embed: pingembed })
    }
}