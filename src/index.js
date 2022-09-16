// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()

// Create a bot process
import { Client, GatewayIntentBits } from 'discord.js'

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!')
})

async function main() {
    await client.login(process.env.TOKEN)
}

main()
