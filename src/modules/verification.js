import {
    EmbedBuilder,
    ChannelType,
    Client,
    GuildMember,
    GuildChannel,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    DMChannel,
    User,
} from 'discord.js'
import nodemailer from 'nodemailer'
import { links as dm_link } from './modmail.js'
import * as VERIFY_EMBED from '../embeds/verify.js'

const lang_embeds = {
    de: [
        VERIFY_EMBED.default.id_ask_de,
        VERIFY_EMBED.default.email_de,
        VERIFY_EMBED.default.verified_de,
    ],
    en: [
        VERIFY_EMBED.default.id_ask_en,
        VERIFY_EMBED.default.email_en,
        VERIFY_EMBED.default.verified_en,
    ],
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const mailOptions = {
    from: process.env.EMAIL_USER,
    //to: 'to-address',
    subject: 'Discord Verifizierungs Code',
    //text: 'Message Content',
}

/**
 * @param {GuildMember} member
 */
async function guildeMemberAdd(member) {
    console.log(member.user.tag, 'joined!')
}

/**
 * @param {Client} client
 */
async function init(client) {
    const guild = await client.guilds.fetch(process.env.GUILD_ID)
    const channel = await guild.channels.fetch(process.env.ADMIN_CHANNEL_ID)
    if (!channel) return

    dm_link['366491882769088512'] = {
        type: 'verify',
        verification: {
            state: 0,
            lang: null,
            TUM_ID: null,
        },
    }

    const test_user = await guild.members.fetch('366491882769088512')
    askForLanguage(test_user)
}

/**
 * @param {GuildMember} member
 * @description Verify user by guiding through steps
 */
async function askForLanguage(member) {
    /*
     * STEP 1: LANGUAGE SELECTION
     */
    let message = await member.send({
        embeds: [VERIFY_EMBED.default.lang_ask],
    })

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('de')
            .setLabel('🇩🇪')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('en')
            .setLabel('🇬🇧')
            .setStyle(ButtonStyle.Secondary)
    )

    await message.edit({
        components: [row],
    })

    const collector = await message.createMessageComponentCollector(
        () => true,
        { time: 120000 }
    )

    collector.on('collect', async (interaction) => {
        dm_link[interaction.user.id].verification.lang = interaction.customId
        dm_link[interaction.user.id].verification.state = 1 // 1: enter tum code
        const embed = lang_embeds[interaction.customId][0]

        interaction.reply({
            embeds: [embed],
        })

        await collector.stop()
        askForTumID(interaction.user)
    })
}

/**
 * @param {User} user
 * @description STEP 2: ENTER TUM ID
 */
async function askForTumID(user) {
    const collector = await user.dmChannel.createMessageCollector({
        filter: (m) => !m.author.bot,
        time: 15000,
    })

    collector.on('collect', async (message) => {
        dm_link[user.id].verification.TUM_ID = message.content
        dm_link[user.id].verification.state = 2 // 2: await verification
        const embed = lang_embeds[dm_link[user.id].verification.lang][1]

        user.send({
            embeds: [embed],
        })

        await collector.stop()
        sendVerifyEmail(user, dm_link[user.id].verification.TUM_ID)
    })
}

/**
 * @param {User} user
 * @description STEP 3: SEND VERIFICATION CODE PER EMAIL
 */
async function sendVerifyEmail(user, tum_id) {
    console.log('email', tum_id)
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
        name: 'guildMemberAdd',
        run: guildeMemberAdd,
    },
]
