// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const client = new Client({
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,

    ],
})
client.once('ready', () => console.log('Ready!'))
const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
    await init_events()
    await client.login(process.env.TOKEN)
}

async function init_events() {
    const eventFiles = fs
        .readdirSync(__dirname + '/modules')
        .filter((file) => file.endsWith('.js'))

    for (const file of eventFiles) {
        const events = await import(__dirname + `/modules/${file}`)
        for (const event of events.default) {
            if (event.type !== 'event') continue
            if (event.once)
                client.once(event.name, (...args) => event.run(...args))
            else client.on(event.name, (...args) => event.run(...args))
        }
    }
}

main()
