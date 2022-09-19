import {
    Message,
    EmbedBuilder,
    TextChannel,
    User,
    ThreadChannel,
    ChannelType,
} from 'discord.js'

/**
 * @type {{ [keys: string] : {type : 'mail' | 'verify', thread?: number | verification?: any }}}
 * @description Links user ids to thread ids.
 *
 * ```
 * links["user_id"] = {
 *      type: 'mail | verify',
 *      thread?: "thread_id" // if type == mail,
 *      verification?: // if type == verify
 * }
 * ```
 */
export let links = {}

/**
 * @param {Message} message
 * @description If a user direct messages the bot,
 * the message arrives here.
 */
async function message_incoming(message) {
    if (message.guildId) return // If in guild, ignore, otherwise dm
    if (message.author?.bot) return // If bot, ignore

    // If user is currently in active communication with another module, ignore
    if (links[message.author.id] && links[message.author.id].type != 'mail') return

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

    thread?.send({
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

    links[message.author.id] = {
        type: 'mail',
        thread: thread.id
    }
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
        (key) => links[key].type == 'mail' && links[key].thread === message.channel.id
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
    async function spawn_thread() {
        let thread = await channel.threads.create({
            name: author.tag,
            autoArchiveDuration: 60,
            reason: 'Modmail',
        })
        links[author.id] ||= {}
        links[author.id].thread = thread.id
        return thread
    }

    if (links[author.id]?.type == 'mail') {
        try {
            let thread = await channel.threads.fetch(links[author.id].thread)
            return thread
        } catch(e) {
            console.log(e)
        }
    }

    return spawn_thread()
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
