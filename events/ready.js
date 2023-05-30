const { EventBuilder } = require("@bambusgamer/toolbox");

module.exports = new EventBuilder({
    name: "ready",
    once: true,
    async callback(client, modules) {

        let usercount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        const channelcount = client.channels.cache.size;
        const guildcount = client.guilds.cache.size;

        console.log(`Online as ${client.user.tag}(${client.user.id}) on ${guildcount} guilds watching ${channelcount} channels with ${usercount} users.`)

        setInterval(async () => {
            usercount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

            client.user.setPresence({
                activities: [{
                    name: `${usercount} users`,
                    type: "WATCHING"
                }],
                status: "online"
            });
        }, 1000 * 60);
    }
});