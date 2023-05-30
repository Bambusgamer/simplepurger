const { EventBuilder } = require("@bambusgamer/toolbox");

module.exports = new EventBuilder({
    name: "messageCreate",
    once: false,
    async callback(client, modules, message) {
        const channel = modules.db.get(message.channel.id);
        if (!channel) return;

        client.messages.push({
            id: message.id,
            channel: message.channel.id,
            created: message.createdTimestamp,
            deleteAt: message.createdTimestamp + channel,
        });
    },
});