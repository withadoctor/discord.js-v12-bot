const { xpSql } = require("../../db/xp.js")
const { MessageEmbed } = require("discord.js")

// sql 출처: https://gist.github.com/eslachance/2c44c0410b21e7ad0de6c92ea48c0dbf
// markdown 참고: https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51
module.exports = {
    config: {
        name: "ranking",
        aliases: ["r", "leaderboard", "ㄱ", "랭킹", "ㄱ무ㅏ", "ㄱ무ㅏㅑㅜㅎ"],
        description: "경험치 랭킹",
        usage: "ranking",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        const top10 = xpSql().prepare("SELECT * FROM xp WHERE guildid = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

        let rank = `\`\`\`md\n`;
        rank += `# 경험치 랭킹\n`;
        rank += `> [이름](횟수) <레벨>\n`;
        for(const [i, data] of top10.entries()) { // for(const data of top10) {
            rank += `${i+1}. [${data.username}](${data.points}) <${data.level}>\n`;
        }
        rank += `\`\`\``;
        return message.channel.send(rank);
    }
}
