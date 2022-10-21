import { Message, EmbedBuilder } from 'discord.js'

/**
 * @param {Message} message
 */
async function run(message) {
    switch (true) {
        case message.content.toLowerCase() == 'test':
            let embed = new EmbedBuilder().setColor(0x5bc0de)
            message.reply('PGDP Tests failed! L!')
            break

        case true:
            break

        default:
    }
}

/**
 * @export
 */
export default [
    {
        type: 'event',
        name: 'messageCreate',
        run,
    },
]
