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
        verify: {
            lang: null,
            TUM_ID: null,
        }
    }

    const test_user = await guild.members.fetch('366491882769088512')
    initiate_verification(test_user)

    /*let message = await channel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle('(Studentenorganisierter) TUM Discord ○ Verifikation')
                .setColor(0x3489eb)
                .setThumbnail(
                    'https://upload.wikimedia.org/wikipedia/commons/b/ba/Tum_logo.gif'
                )
                .setDescription(
                    '🇩🇪 Herlich Willkommen an dem TUM Discord Server,\n' +
                        'Senden sie hier bitte ihre TUM ID (Beispiel: ab123abc) und folgen Sie den Instruktionen für die Verifikation.\n\n' +
                        '🇬🇧 Welcome to the Technical University Discord Server,\n' +
                        'to proceed with the _english_ version of the verification we ask you to press the button below.'
                ),
        ],
    })

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('english')
            .setLabel('🇬🇧')
            .setStyle(ButtonStyle.Secondary)
    )

    message.edit({
        components: [row],
    })

    const embeds = [
        new EmbedBuilder()
            .setTitle('(Student-run) TUM Discord ○ Verification')
            .setColor(0x3489eb)
            .setDescription(
                'We ask you to provide your TUM identification (e.g. ab123abc) below in this private message chamber and follow the instructions.'
            ),
        new EmbedBuilder().setDescription('ab123cde'),
        new EmbedBuilder()
            .setTitle('(Studentenorganisierter) TUM Discord ○ Verifikation')
            .setColor(0x3489eb)
            .setDescription(
                'Eine Email wurde auf ihren TUM-Account geschickt, bitte schicken sie den Verifikations-Code hier rein.\n\n' +
                    'ab123cde@tum.de'
            ),
        new EmbedBuilder()
            .setTitle('(Student-run) TUM Discord ○ Verification')
            .setColor(0x3489eb)
            .setDescription(
                'An email has been sent to your TUM-account. Please provide the verification code to ensure your identity.\n\n' +
                    'ab123cde@tum.de'
            ),
        new EmbedBuilder().setDescription('passwort'),
        new EmbedBuilder()
            .setTitle('Herzlich Willkommen!')
            .setColor(0x3489eb)
            .setDescription(
                'Herzlich Willkommen an dem Studentenorganisierten Discord der TUM'
            )
            .addFields([
                {
                    name: 'Schritt 1',
                    value: 'Wir würden dich bitten kurz die <#1020286040080130048> zu überfliegen. Die Benutzung des Servers verpflichtet zur Akzeptanz der Regeln.',
                },
                {
                    name: 'Schritt 2',
                    value: 'Wir würden dich bitten kurz deine Studiengänge in <#1020306342528962640> zu wählen. Dann kriegst du Zugang zu den Channels von deinen Kursen!',
                },
                {
                    name: 'Schritt 3',
                    value: 'Habt Spaß!',
                },
            ]),
        new EmbedBuilder()
            .setTitle('Welcome!')
            .setColor(0x3489eb)
            .setDescription(
                'Welcome to the student-run TUM Discord Server'
            )
            .addFields([
                {
                    name: 'Step 1',
                    value: 'Please make sure to read the rules at <#1020286040080130048>. By using the server you agree to the rules.',
                },
                {
                    name: 'Step 2',
                    value: 'We ask you to chose your study courses at <#1020306342528962640>. You will then gain access to restricted areas per course.',
                },
                {
                    name: 'Step 3',
                    value: 'Have fun!',
                },
            ]),
    ]

    embeds.forEach(async (embed) => {
        await channel.send({
            embeds: [embed],
        })
    })*/
}

/**
 * @param {GuildMember} member
 * @description If a user joins or leaves a voice channel.
 */
async function initiate_verification (member) {
    member.send('Test')
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
