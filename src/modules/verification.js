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
import { randomBytes } from 'node:crypto'

const time = 520000

const lang_embeds = {
    de: {
        id_ask: VERIFY_EMBED.default.id_ask_de,
        email: VERIFY_EMBED.default.email_de,
        verified: VERIFY_EMBED.default.verified_de,
    },
    en: {
        id_ask: VERIFY_EMBED.default.id_ask_en,
        email: VERIFY_EMBED.default.email_en,
        verified: VERIFY_EMBED.default.verified_en,
    },
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

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
        const embed = lang_embeds[interaction.customId].id_ask

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
        time,
    })

    collector.on('collect', async (message) => {
        //find TUM IDs in message with regex
        const idRegex = /[[:alpha:]]{2}[0-9]{2}[[:alpha:]]{3}/;
        let matches = m.content.match(idRegex);
        if (matches.length != 1) {
            // dmChannel.send("Please send your TUM ID exactly once. It should look something like the following: ab12cde");
            return;
        }

        dm_link[user.id].verification.TUM_ID = matches[0];
        dm_link[user.id].verification.state = 2 // 2: await verification
        let embed = lang_embeds[dm_link[user.id].verification.lang].email
        embed.description += `${dm_link[user.id].verification.TUM_ID}@mytum.de`

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
    let hash = randomBytes(20).toString('hex')
    console.log(hash)

    /*try {
        await new Promise((res, err) =>
            transporter.sendMail(
                {
                    from: process.env.EMAIL_USER,
                    to: tum_id,
                    subject: 'TUM Discord Verifizierungs Code',
                    text: 'Ihr Code ist: ' + hash,
                },
                function (error, info) {
                    if (error) {
                        err(error)
                    } else {
                        res()
                        //console.log('Email sent: ' + info.response)
                    }
                }
            )
        )
    } catch (e) {
        // error
        return
    }*/

    // success

    const collector = await user.dmChannel.createMessageCollector({
        filter: (m) => !m.author.bot,
        time,
    })

    collector.on('collect', async (message) => {
        const guild = await message.client.guilds.fetch(process.env.GUILD_ID)
        const embed = lang_embeds[dm_link[user.id].verification.lang].verified

        user.send({
            embeds: [embed],
        })

        delete dm_link[user.id]

        let guild_member = await guild.members.fetch(user.id)
        let verify_role = await guild.roles.fetch(process.env.VERIFIED_ROLE)
        guild_member.roles.add(verify_role)

        await collector.stop()
        console.log(message.content)

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
]
