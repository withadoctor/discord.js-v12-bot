const { addXp } = require("../../db/xp.js")

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type == "dm") return;
    addXp(bot, message);

    let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(bot.prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}