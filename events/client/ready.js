const { init } = require("../../db/xp.js")

module.exports = bot => {
    init(bot);

    let activities = [ `${bot.guilds.cache.size} servers!`, `${bot.channels.cache.size} channels!`, `${bot.users.cache.size} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`${bot.prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)

    console.log(`${bot.user.username} is online`);
};