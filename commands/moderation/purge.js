// 출처: https://stackoverflow.com/questions/59312602/discord-js-purge-js-command-issue
module.exports = {
    config: {
        name: "clear",
        aliases: ["c", "ㅊ", "청소"],
        description: "청소",
        usage: "clear <num>",
        category: "moderation", // help에서 표시 하지 않음
        accessableby: "Moderator", // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        const amount = parseInt(args[0]) || 1;
        message.channel.bulkDelete(amount+1, true);
    }
}
