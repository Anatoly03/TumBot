import { CategoryChannel, ChannelType, Client, VoiceState } from 'discord.js'

/**
 * @type {{ [keys: string] : number}}
 * @description Keep track of general voice channels.
 *
 * ```
 * voice_channels["channel_id"] = [member id's, ...]
 * ```
 */
let voice_channels = {}

/**
 * @param {Client} client
 */
async function init(client) {
    recalculate(client)
}

/**
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @description If a user joins or leaves a voice channel.
 */
async function voiceStateUpdate(oldState, newState) {
    recalculate(newState.client)
}

/**
 * @param {Client} client
 * @description This function servers two purposes:
 * First, if all general voice channels are full, create a new channel.
 * Second, if two or more voice channels are empty, get rid of them.
 */
async function recalculate(client) {
    const guild = await client.guilds.fetch(process.env.GUILD_ID)
    const category_channel = await guild.channels.fetch(
        process.env.GENERAL_VOICE_CATEGORY
    )
    if (category_channel.type != ChannelType.GuildCategory)
        return console.log('Error vc.js: General VC Category Id is no Category')
    category_channel.children.cache.forEach((vc) => {
        voice_channels[vc.id] = vc.members.map(m => m.id)
        //console.log(vc.id,vc.members.map((m) => m.id))
    })

    let empty = []

    Object.keys(voice_channels).forEach(channel_id => {
        if (voice_channels[channel_id].length == 0) empty.push(channel_id)
    })

    // There are no empty voice channels.
    if (empty.length == 0) {
        let vc = await guild.channels.create({
            name: 'VC',
            type: ChannelType.GuildVoice,
        })
        voice_channels[vc.id] = []
        vc.setParent(process.env.GENERAL_VOICE_CATEGORY)
    }

    // There are two or more channels empty.
    else if (empty.length > 1) {
        for (let i = 0; i < empty.length - 1; i++) {
            let vc = await guild.channels.fetch(empty[i])
            delete voice_channels[vc.id]
            vc.delete()
        }
    }

    let i = 1
    Object.keys(voice_channels).forEach(async (channel_id) => {
        let vc = await guild.channels.fetch(channel_id)
        vc.setName('VC ' + i)
        i += 1
    })
}

/**
 * @export
 */
export default [
    {
        type: 'event',
        name: 'ready',
        run: init,
    },
    {
        type: 'event',
        name: 'voiceStateUpdate',
        run: voiceStateUpdate,
    },
]
