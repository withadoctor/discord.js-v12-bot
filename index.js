const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const bot = new Client();

Object.values(config).forEach((x,i) => bot[Object.keys(config)[i]] = x);
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(bot.token);