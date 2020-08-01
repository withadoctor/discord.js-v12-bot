const { MessageEmbed, version: djsversion } = require("discord.js")
const { version } = require('../../package.json');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = {
    config: {
        name: "botinfo",
        aliases: ["bi", "ㅠㅑ", "봇인포", "봇정보"],
        description: "봇 정보",
        usage: "botinfo",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members", // help에서 표시 하지 않음
    },
	formatBytes: (bytes) => {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	},
    run: async (bot, message, args) => {
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(bot.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || 'BLUE')
			.addField('General', [
				`**❯ Client:** ${bot.user.tag} (${bot.user.id})`,
				`**❯ Commands:** ${bot.commands.size}`,
				`**❯ Servers:** ${bot.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**❯ Channels:** ${bot.channels.cache.size.toLocaleString()}`,
				`**❯ Creation Date:** ${utc(bot.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Version:** v${version}`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**❯ Memory:**`,
				`\u3000 Total: ${module.exports.formatBytes(process.memoryUsage().heapTotal)}`,
				`\u3000 Used: ${module.exports.formatBytes(process.memoryUsage().heapUsed)}`
			])
			.setTimestamp();

		message.channel.send(embed);
    }
}