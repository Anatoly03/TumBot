import { ChannelType, Message, PermissionFlagsBits } from 'discord.js'
import { askForLanguage } from './verification.js'

/**
 * @param {Message} message
 * @description Moderator verifies user with command.
 */
async function message_command(message) {
    if (message.author?.bot) return
    if (message.channel.type !== ChannelType.GuildText) return
    if (!message.content.startsWith('!')) return

    const params = message.content.slice(1).split(' ')

    if (params[0] == 'verify') {
        // Check if user is admin
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return

        if (message.mentions.members.size > 0) {
            message.mentions.members.forEach((m) => {
                askForLanguage(m)
            })
        } else {
            const verified = message.member.roles.cache.has(process.env.VERIFIED_ROLE)
            if (!verified) {
                askForLanguage(message.member)
            }
        }
    }
}

/**
 * @export
 */
export default [
    {
        type: 'event',
        name: 'messageCreate',
        run: message_command,
    },
]
