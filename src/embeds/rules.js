import { EmbedBuilder } from 'discord.js'

export default [
    new EmbedBuilder()
        .setTitle('(Studentenorganisierter) TUM Discord ○ Regeln')
        .setColor(0x3489eb)
        //.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/b/ba/Tum_logo.gif')
        .setImage(
            'https://www.rubner.com/fileadmin/_processed_/d/3/csm_Blick_01_c_90193daba8.jpg'
        ),
    new EmbedBuilder()
        .setTitle('Allgemeines Regelwerk')
        .setColor(0x3489eb)
        .setDescription(
            ':purple_heart: **Seid nett** und bleibt cool. **Respektiert** euch gegenseitig. Keine Insulte, Drohungen, Mobbing oder persönliche Angriffe sind zugelassen.\n\n' +
                ':small_blue_diamond: Befolgt die [Discord Community Guidelines](https://discord.com/guidelines) und [Discord Nutzungsbedingungen](https://discord.com/terms). Alle [Gesetzte der Bundesrepublik Deutschland](https://www.gesetze-im-internet.de/gg/BJNR000010949.html) sind einzuhalten. Die Moderation erweitert die Geltung der Regeln für alle auf dem Server sichtbaren Inhalte (Chat, Name, Profilbild, Beschreibung, et cetera)\n\n' +
                ':small_blue_diamond: [Ignorantia iuris non excusat](https://en.wikipedia.org/wiki/Ignorantia_juris_non_excusat). Das Nichtwissen der Regeln entschuldigt keine Benehmen.\n\n' +
                ':small_blue_diamond: [Spam](https://en.wikipedia.org/wiki/Messaging_spam) ist untersagt.\n\n' +
                ':small_blue_diamond: Radikalismus, Rassismus, Sexismus und Diskriminierung in jeglicher Form sind strengstens untersagt.\n\n' +
                ':small_blue_diamond: Verbreitung von persönlichen Informationen mit oder ohne Erlaubnis ist verboten ([Datenschutz-Grundverordnung](https://dsgvo-gesetz.de/)). Passwörter und Links für TUM-relevante Medien sind nicht an dritte weiterzugeben.\n\n' +
                ':small_blue_diamond: NSFW ([Not Safe For Work](https://en.wikipedia.org/wiki/Not_safe_for_work)) Inhalte sind strengstens verboten.\n\n' +
                ':small_blue_diamond: Werbung für irrelevante Discord-Server ist verboten. Irrelevant gilt jeder Server, der nichts mit der TUM zu tun hat.\n\n' +
                ':fleur_de_lis: Die Nichtbefolgung der Regeln kann zum Stummschalten führen. Die Moderation hat das Recht die Regeln zu jeder Zeit zu ändern.'
        ),
    new EmbedBuilder()
        .setTitle('ℹ️ Informationen')
        .setColor(0x3489eb)
        .setDescription(
            ':small_orange_diamond: Discord Einlade-Link: https://discord.gg/jpRd9JnGjK\n' +
                ':small_orange_diamond: [Campus](https://campus.tum.de/)\n' +
                ':small_orange_diamond: [Moodle](https://www.moodle.tum.de/)\n' +
                ':small_orange_diamond: **[MATHE VORKURS VORLESUNGS CHAT](https://chat.tum.de/channel/Mathe-Vorkurs-2022-Vorlesung)**\n' +
                ':small_orange_diamond: Passwort Moodle: `DantorCbntorCaotor`\n' +
                ':small_orange_diamond: Passwort Unterlagen: `aABbAaaABbbB`'
        ),
]