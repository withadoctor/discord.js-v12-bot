const SQLite = require("better-sqlite3");
const sql = new SQLite('./db/xp.sqlite');


module.exports.xpSql = () => {
    return sql;
};

module.exports.init = (bot) => {
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'xp';").get();
    if (!table['count(*)']) {
        sql.prepare("CREATE TABLE xp (id TEXT PRIMARY KEY, guildid TEXT, userid TEXT, username TEXT, points INTEGER, level INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_xp_id ON xp (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
    bot.getXp = sql.prepare("SELECT * FROM xp WHERE guildid = ? AND userid = ?");
    bot.setXp = sql.prepare("INSERT OR REPLACE INTO xp (id, guildid, userid, username, points, level) VALUES (@id, @guildid, @userid, @username, @points, @level);");
};

module.exports.addXp = (bot, message) => {
    if (message.guild) {
        let xp = bot.getXp.get(message.guild.id, message.author.id);
        if (!xp) {
            xp = {
                id: `${message.guild.id}-${message.author.id}`,
                guildid: message.guild.id,
                userid: message.author.id,
                username: `${message.author.username}#${message.author.discriminator}`,
                points: 0,
                level: 1,
            }
        }
        const curLevel = Math.floor(0.1 * Math.sqrt(++xp.points))+1;
        if(xp.level < curLevel) {
            message.channel.send(`축하합니다 ${message.author.username}, 레벨이 상승하였습니다 ${curLevel}!!`)
        }
        xp.level = curLevel;
        bot.setXp.run(xp);
    }
};
