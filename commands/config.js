const { CommandBuilder } = require("@bambusgamer/toolbox");

module.exports = new CommandBuilder({
    slash: {
        data: (client, modules) => ({
            name: "config",
            description: "Configure the bot",
            options: [
                {
                    type: 1,
                    name: "on",
                    description: "Turn on the bot",
                    options: [
                        {
                            type: 4,
                            name: "minutes",
                            description: "Minutes before deleting the message",
                            required: true,
                            min_value: 1,
                            max_value: 60 * 24,
                        },
                    ],
                },
                {
                    type: 1,
                    name: "off",
                    description: "Turn off the bot",
                },
            ],
            default_member_permissions: Number(modules.perms.ManageMessages),
            dm_permission: false,
        }),
        async callback(client, modules, interaction) {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand === "on") {
                const minutes = interaction.options.getInteger("minutes");
                modules.db.set(interaction.channel.id, minutes * 60 * 1000);
                interaction.reply(`Now deleting messages after ${minutes} minutes!`);
            } else if (subcommand === "off") {
                modules.db.delete(interaction.channel.id);
                interaction.reply("No messages will be deleted anymore!");
            }
        }
    }
});