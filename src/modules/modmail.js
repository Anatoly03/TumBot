import {
    Message,
    EmbedBuilder,
    TextChannel,
    User,
    ThreadChannel,
    ChannelType,
} from 'discord.js'

/**
 * @type {{ [keys: string] : string}}
 * @description Links user ids to thread ids.
 *
 * ```
 * links["user_id"] = "thread_id"
 * ```
 */
let links = {}

/**
 * @param {Message} message
 * @description If a user direct messages the bot,
 * the message arrives here.
 */
async function message_incoming(message) {
    if (message.guildId) return // If in guild, ignore, otherwise dm
    if (message.author?.bot) return // If bot, ignore

    const guild = await message.client.guilds.fetch(process.env.GUILD_ID)
    const channel = await guild.channels.fetch(process.env.ADMIN_CHANNEL_ID)
    if (!channel) return

    const thread = await create_user_thread(channel, message.author)

    let response = new EmbedBuilder().setColor(0x5bc0de).setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
    })

    if (message.content.length > 0)
        response.setDescription(message.content.substring(0, 1024))

    if (message.attachments.size == 1) {
        response.setImage(message.attachments.first().url)
    }

    thread.send({
        embeds: [response],
    })

    if (message.attachments.size > 1) {
        for (let i = 0; i < message.attachments.size; i++) {
            thread.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x5bc0de)
                        .setImage(message.attachments.map((j) => j.url)[i]),
                ],
            })
        }
    }

    links[message.author.id] = thread.id
}

/**
 * @param {Message} message
 * @description If a moderator sends a message
 * using the bot, it will be sent to the user.
 */
async function message_outgoing(message) {
    if (message.author?.bot) return
    if (message.channel.type !== ChannelType.PublicThread) return

    let user_id = Object.keys(links).find(
        (key) => links[key] === message.channel.id
    )
    if (!user_id) return

    const user = await message.client.users.fetch(user_id)

    let response = new EmbedBuilder().setColor(0x5bc0de)

    if (message.content.length > 0)
        response.setDescription(message.content.substring(0, 1024))

    if (message.attachments.size == 1)
        response.setImage(message.attachments.first().url)

    user.send({
        embeds: [response],
    })

    if (message.attachments.size > 1) {
        for (let i = 0; i < message.attachments.size; i++) {
            user.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x5bc0de)
                        .setImage(message.attachments.map((j) => j.url)[i]),
                ],
            })
        }
    }
}

/**
 * @param {TextChannel} channel The modmail channel (the one all threads descend from)
 * @param {User} author The user that the thread is made for.
 * @returns {ThreadChannel}
 * @description Create (or get, if existing) a thread for a user.
 */
export async function create_user_thread(channel, author) {
    /** @type {ThreadChannel} */
    let thread

    if (!links[author.id]) {
        thread = await channel.threads.create({
            name: author.tag,
            autoArchiveDuration: 60,
            reason: 'Modmail',
        })
        links[author.id] = thread.id
    } else thread = await channel.threads.fetch(links[author.id])

    return thread
}

/**
 * @export
 */
export default [
    {
        type: 'event',
        name: 'messageCreate',
        run: message_incoming,
    },
    {
        type: 'event',
        name: 'messageCreate',
        run: message_outgoing,
    },
]
