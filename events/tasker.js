const { EventBuilder } = require("@bambusgamer/toolbox");

const { setTimeout: timeout } = require("timers/promises");

module.exports = new EventBuilder({
    name: "ready",
    once: true,
    async callback(client, modules) {
        setInterval(async () => {
            const now = Date.now();
            const maxAge = 1000 * 60 * 60 * 24 * 14;
            const messages = client.messages.filter((m) => m.deleteAt < now);
            client.messages = client.messages.filter((m) => m.deleteAt >= now);


            const channels = new Map();
            for (const message of messages) {
                const channel = channels.get(message.channel) || { bulk: [], single: [] };
                if (now - message.created < maxAge) {
                    channel.bulk.push(message.id);
                } else {
                    channel.single.push(message.id);
                }
                channels.set(message.channel, channel);
            }

            for (const channel of client.channels.cache.values()) {
                if (!channels.has(channel.id)) continue;
                const { bulk, single } = channels.get(channel.id);

                for (const message of single) {
                    try {
                        await channel.messages.delete(message);
                        await timeout(1000);
                    } catch (err) {
                        await timeout(5000);
                    }
                }

                const buckets = [];
                for (let i = 0; i < bulk.length; i += 100) {
                    buckets.push(bulk.slice(i, i + 100));
                }

                for (const bucket of buckets) {
                    try {
                        await channel.bulkDelete(bucket);
                        await timeout(1000);
                    } catch (err) {
                        await timeout(5000);
                    }
                }
            }
        }, 1000 * 60);
    },
});