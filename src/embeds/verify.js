import { EmbedBuilder } from 'discord.js'

export default {
    /*
     * Language selection message
     */
    lang_ask: new EmbedBuilder()
        .setTitle('(Studentenorganisierter) TUM Discord ○ Verifikation')
        .setColor(0x3489eb)
        .setThumbnail('https://i.imgur.com/mCer5Za.png')
        .setDescription(
            '🇩🇪 Herlich Willkommen an dem TUM Discord Server,\n' +
            'wenn Sie mit der _Deutschen_ Verifikationsanleitung anmelden wollen, bitte drücken Sie den Knopf links.\n\n' +
            '🇬🇧 Welcome to the Technical University Discord Server,\n' +
            'to proceed with the _english_ version of the verification we ask you to press the button below to the right.'
        ),

    /*
     * Asking for TUM ID message
     */
    id_ask_de: new EmbedBuilder()
        .setTitle('(Studentenorganisierter) TUM Discord ○ Verifikation')
        .setColor(0x3489eb)
        .setDescription(
            'Senden Sie hier bitte Ihre TUM ID (Beispiel: ab12abc) und folgen Sie den Anweisungen für die Verifikation.'
        ),
    id_ask_en: new EmbedBuilder()
        .setTitle('(Student-run) TUM Discord ○ Verification')
        .setColor(0x3489eb)
        .setDescription(
            'We kindly ask you to provide your TUM identification (e.g. ab12abc) below in this private message chamber and follow the instructions.'
        ),

    /*
     * Email sent message
     */
    email_de: new EmbedBuilder()
        .setTitle('(Studentenorganisierter) TUM Discord ○ Verifikation')
        .setColor(0x3489eb)
        .setDescription(
            'Eine Email wurde auf Ihren TUM-Account geschickt. Bitte drücken Sie den Verifikations-Code dort an.\n\n' +
            'ab12cde@mytum.de'
        ),
    email_en: new EmbedBuilder()
        .setTitle('(Student-run) TUM Discord ○ Verification')
        .setColor(0x3489eb)
        .setDescription(
            'An email has been sent to your TUM-account. Please press the link attached in the email to verify your account.\n\n' +
            'ab12cde@mytum.de'
        ),

    /*
     * Welcome message
     */
    verified_de: new EmbedBuilder()
        .setTitle('Herzlich Willkommen!')
        .setColor(0x3489eb)
        .setDescription(
            'Herzlich Willkommen an dem Studentenorganisierten Discord der TUM'
        )
        .addFields([
            {
                name: 'Schritt 1',
                value: 'Wir würden Sie kurz bitten die <#1020286040080130048> zu überfliegen. Die Benutzung des Servers verpflichtet zur Befolgung der Regeln.',
            },
            {
                name: 'Schritt 2',
                value: 'Wir würden Sie auch bitten kurz Ihre Studiengänge in <#1020306342528962640> zu wählen. Dann kriegst du Zugang zu den Channels von deinen Kursen!',
            },
            {
                name: 'Schritt 3',
                value: 'Habt Spaß!',
            },
        ]),
    verified_en: new EmbedBuilder()
        .setTitle('Welcome!')
        .setColor(0x3489eb)
        .setDescription('Welcome to the student-run TUM Discord Server')
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
}
