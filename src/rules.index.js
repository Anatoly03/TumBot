// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()

// Spawn an Embed containing rules
import { WebhookClient } from 'discord.js'
const webhookClient = new WebhookClient({
    id: process.env.RULES_WEBHOOK_ID,
    token: process.env.RULES_WEBHOOK_TOKEN,
})

import embeds from './embeds/rules.js'

webhookClient.send({
    embeds,
})
