const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const { Handler } = require('@bambusgamer/toolbox');
const JSONdb = require('simple-json-db');

require('dotenv').config();

const db = new JSONdb('./db.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

client.messages = [];

client.handler = new Handler({
    emitters: [{ name: "client", emitter: client }],
    paths: {
        commands: './commands',
        events: './events',
    },
    hydrationModules: {
        db,
        perms: PermissionFlagsBits,
    },
    options: [client],
});

client.handler.load();

client.login(process.env.TOKEN);