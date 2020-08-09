const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "commands", "ㅗ", "ㅗ디ㅔ", "도움", "헬프"],
        usage: "(command)",
        description: "Displays all commands that the bot has.",
        category: "miscellaneous", // help에서 표시 하지 않음
        accessableby: "Members" // help에서 표시 하지 않음
    },
    run: async (bot, message, args) => {
        const embed = new MessageEmbed()
            .setColor(bot.colours.cyan)
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix is: **${bot.prefix}**`)
            embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category == category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${bot.prefix}help\` for the list of the commands.`))
            command = command.config

            embed.setDescription(stripIndents`
            **명령어들:** \`${command.name}\`${command.aliases ? ', \`'+command.aliases.join("\`, \`")+'\`' : ""}
            
            **설명:** ${command.description || "No Description provided."}
            
            **사용법:** ${command.usage ? `\`${bot.prefix}${command.usage}\`` : "No Usage"}
            
            **사용가능한 사람:** ${command.accessableby || "Members"}`
            )

            return message.channel.send(embed)
        }
    }
}
