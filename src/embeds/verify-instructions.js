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
        .setTitle('ℹ️ Wie verifiziere ich mich?')
        .setColor(0x7bcc76)
        .setDescription(
            `🇩🇪 Um sich zu verifizieren und Zugang zum Server zu kriegen bitten wir Sie den Instruktionen von <@1020349732746436728> zu folgen.
            Bei Problemen können Sie in <#1021690009759256606> mit dem Admin-Team in Kontakt treten.
            
            🇬🇧 To verify and gain access to the server, please follow the instructions provided by <@1020349732746436728>.
            If you have troubles verifying, please feel free to ask for help in <#1021690009759256606>`
        ),
]
