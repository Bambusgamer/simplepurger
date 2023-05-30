const { EventBuilder } = require("@bambusgamer/toolbox");

const { REST } = require('@discordjs/rest');

require('dotenv').config();

module.exports = new EventBuilder({
    name: "ready",
    once: true,
    async callback(client, modules) {
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        const commands = client.handler.exportCommands();

        await rest.put(
            `/applications/${client.user.id}/commands`,
            { body: Array.from(Object.values(commands)) },
        );
    },
});