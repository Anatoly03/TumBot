import {
    EmbedBuilder,
    ChannelType,
    Client,
    GuildMember,
    GuildChannel,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
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
    initiate_verification(test_user)
}

/**
 * @param {GuildMember} member
 * @description STEP 1: CHOSE LANGUAGE
 */
async function initiate_verification(member) {
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

    message.edit({
        components: [row],
    })
}

/**
 * @param {import('discord.js').Interaction} interaction
 * @description STEP 2: ENTER TUM CODE
 */
async function languageCheck(interaction) {
    if (!interaction.isButton()) return
    if (interaction.channel.type != ChannelType.DM) return
    if (dm_link[interaction.user.id].type != 'verify') return

    dm_link[interaction.user.id].verification.lang = interaction.customId
    dm_link[interaction.user.id].verification.state = 1 // 1: enter tum code
    const embed = lang_embeds[interaction.customId][0]

    //console.log(embed)

    interaction.reply({
        embeds: [embed]
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
        name: 'guildMemberAdd',
        run: guildeMemberAdd,
    },
    {
        type: 'event',
        name: 'interactionCreate',
        run: languageCheck,
    },
]
