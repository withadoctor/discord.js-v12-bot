module.exports = {
    config: {
        name: "uptime",
        aliases: ["ut", "셔", "업타임"],
        description: "봇 업타임",
        usage: "uptime",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `
        }

        message.channel.send(`I have been online for: ${duration(bot.uptime)}`)
    }
}
