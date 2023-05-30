const { EventBuilder } = require("@bambusgamer/toolbox");

module.exports = new EventBuilder({
    name: "interactionCreate",
    async callback(client, modules, interaction) {
        if (interaction.isCommand()) {
            const command = client.handler.slashCommands.get(interaction.commandName);
            if (!command) return;
            await command.callback(interaction);
        }
    }
});