import { CategoryChannel, ChannelType, Client, VoiceState } from 'discord.js'

/**
 * @type {{ [keys: string] : number}}
 * @description Keep track of general voice channels.
 *
 * ```
 * voice_channels["channel_id"] = [member id's, ...]
 * ```
 */
let voice_channels = {};

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
    recalculate(newState.client);
}

/**
 * @param {Client} client
 * @description This function servers two purposes:
 * First, if all general voice channels are full, create a new channel.
 * Second, if two or more voice channels are empty, get rid of them.
 */
async function recalculate(client) {
    if (!process.env.PROD) console.log("Debug vc.js: recalculating...");
    const guild = await client.guilds.fetch(process.env.GUILD_ID)
        .catch(e => {
            console.log("Error vc.js: Invalid environment GUILD_ID (fetch failed)");
            throw e;
        });
    
    const category_channel = await guild.channels.fetch(
        process.env.GENERAL_VOICE_CATEGORY
    ).catch(e => {
        console.log('Error vc.js: General VC Category Id is invalid (fetch failed)');
        throw e;
    });
    if (!process.env.PROD) console.log("Debug vc.js: populating voice_channels...");
    category_channel.children.cache.forEach((vc) => {
        voice_channels[vc.id] = vc.members.map(m => m.id)
    })

    if (!process.env.PROD) console.log("Debug vc.js: finding empty channels...");
    let empty = [];
    Object.keys(voice_channels).forEach(channel_id => {
        if (voice_channels[channel_id].length == 0) empty.push(channel_id);
    })

    // There are no empty voice channels.
    if (empty.length == 0) {
        if (!process.env.PROD) console.log("Debug vc.js: no empty voice channels, creating a new one");
        let vc = await guild.channels.create({
            name: 'VC',
            type: ChannelType.GuildVoice,
        }).catch(e => {
            console.log('Error vc.js: Failed to create new voice channel');
            throw e;
        })
        voice_channels[vc.id] = [];
        vc.setParent(process.env.GENERAL_VOICE_CATEGORY);
        if (!process.env.PROD) console.log("Debug vc.js: Voice channel created successfully");
    }

    // There are two or more channels empty.
    else if (empty.length > 1) {
        if (!process.env.PROD) console.log("Debug vc.js: deleting empty channels");
        for (let i = 0; i < empty.length - 1; i++) {
            let vc = await guild.channels.fetch(empty[i])
                .catch(e => {
                    console.log(`Error vc.js: Failed to fetch empty channel with id ${empty[i]}`);
                    throw e;
                });
            vc.delete();
            delete voice_channels[vc.id];
        }
    }

    if (!process.env.PROD) console.log("Debug vc.js: renaming channels...");
    let i = 1
    Object.keys(voice_channels).forEach(async (channel_id) => {
        let vc = await guild.channels.fetch(channel_id)
            .catch(e => {
                console.log(`Error vc.js: Failed to fetch channel with id ${channel_id}`);
                throw e;
            });
        vc.setName('VC ' + i);
        i += 1;
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
