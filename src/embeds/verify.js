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
                'Wenn Sie mit der _Deutschen_ Verifikationsanleitung anmelden wollen, bitte drücken Sie die Deutsche Flagge.\n\n' +
                '🇬🇧 Welcome to the Technical University Discord Server,\n' +
                'To proceed with the _english_ version of the verification we ask you to press the button of the United Kingdom below.\n\n' +
                '🇷🇺 Добро пожаловать на дискорд-сервер Технического Университета Мюнхена. Если вы хотите продолжить ' +
                'с _русской_ версии верификации, нажмите на флаг России.\n\n' +
                '🇨🇳 欢迎来到慕尼黑工业大学的Discord服务器， 如果您想使用中文进行认证登录， 请点击下方的国旗。'
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
    id_ask_ru: new EmbedBuilder()
        .setTitle('Студенческий Дискорд ТУМа ○ Верификация')
        .setColor(0x3489eb)
        .setDescription(
            'Мы просим вас прислать вашу ТУМ-ID (пример: ab12abc) в сообщение снизу и следовать инструкциям.'
        ),
    id_ask_ch: new EmbedBuilder()
        .setTitle('（由学生所组织的）TUM Discord ○ 认证')
        .setColor(0x3489eb)
        .setDescription('请提交您的TUM ID (例如 ab12abc) 并跟随指示进行认证'),

    /*
     * Email sent message
     */
    email_de: new EmbedBuilder()
        .setTitle('(Studentenorganisierter) TUM Discord ○ Verifikation')
        .setColor(0x3489eb)
        .setDescription(
            `Eine Email wurde an Ihre TUM-Email geschickt. Bitte schreiben Sie den dort angegebenen code hier rein.
            [TUM-Email Anleitung](https://campus.tum.de/tumonline/ee/ui/ca2/app/desktop/#/pl/ui/$ctx/help.file_help?$ctx=design=ca2;header=max;lang=de&app_kb=BM&corg=&seite_nr=500231&sprache_nr=1 'TUM-Email Anleitung')
            Email verschickt an: `
        ),
    email_en: new EmbedBuilder()
        .setTitle('(Student-run) TUM Discord ○ Verification')
        .setColor(0x3489eb)
        .setDescription(
            `'An email has been sent to your TUM-account. Please send the code contained within into this channel.
            [TUM-Email Guide](https://campus.tum.de/tumonline/ee/ui/ca2/app/desktop/#/pl/ui/$ctx/help.file_help?$ctx=design=ca2;header=max;lang=de&app_kb=BM&corg=&seite_nr=500231&sprache_nr=1 'How to access your TUM-Email')
            Email sent to: `
        ),
    email_ru: new EmbedBuilder()
        .setTitle('Студенческий Дискорд ТУМа ○ Верификация')
        .setColor(0x3489eb)
        .setDescription(
            `На почту вашего е-майл аккаунта ТУМа был прислан верификационный код. Мы просим вас скопировать эго в этот чат.
            [TUM е-майл гайд](https://campus.tum.de/tumonline/ee/ui/ca2/app/desktop/#/pl/ui/$ctx/help.file_help?$ctx=design=ca2;header=max;lang=de&app_kb=BM&corg=&seite_nr=500231&sprache_nr=1 'Как получить допуск к е-майлу ТУМа')
            Код послали на:`
        ),
    email_ch: new EmbedBuilder()
        .setTitle('（由学生所组织的）TUM Discord ○ 认证')
        .setColor(0x3489eb)
        .setDescription(
            `我们会将认证码以电子邮件的形式发送至您的邮箱，请注意查收。请在这输入您所收到的认证码
            [TUM电子邮件说明](https://campus.tum.de/tumonline/ee/ui/ca2/app/desktop/#/pl/ui/$ctx/help.file_help?$ctx=design=ca2;header=max;lang=de&app_kb=BM&corg=&seite_nr=500231&sprache_nr=1)
            邮件将会送往:`
        ),

    /*
     * Verification process was successful message
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
    verified_ru: new EmbedBuilder()
        .setTitle('Добро пожаловать!')
        .setColor(0x3489eb)
        .setDescription(
            'Добро пожаловать на студенческий дискорд Технического Университета Мюнхена'
        )
        .addFields([
            {
                name: 'Шаг 1-ый',
                value: 'Мы просим вас прочитать правила в <#1020286040080130048>. Использование сервера значит согласия пользователя с правилами и их соблюдения.',
            },
            {
                name: 'Шаг 2-ой',
                value: 'Мы просим вас выбрать курсе в <#1020306342528962640>. Потом Вам будет дан допуск к каналам выбранных вами курсов.',
            },
            {
                name: 'Шаг 3-ий',
                value: 'Удачи!',
            },
        ]),
    verified_ch: new EmbedBuilder()
        .setTitle('欢迎您的到来!')
        .setColor(0x3489eb)
        .setDescription('欢迎来到由学生自发组织的 TUM Discord 服务器')
        .addFields([
            {
                name: '步骤一',
                value: '请您先阅读一下 <#1020286040080130048> 频道。在您使用服务器期间，有义务遵守这些规则。',
            },
            {
                name: '步骤二',
                value: '另外，请您也在 <#1020306342528962640> 频道中选择一下自己的专业。这样您就可以加入自己专业的讨论频道啦！',
            },
            {
                name: '步骤三',
                value: '玩的开心！',
            },
        ]),

    /*
     * This embed follows the second if the the TUM Id is invalid.
     */
    error_id_de: new EmbedBuilder()
        .setTitle('Ungültige TUM Id!')
        .setColor(0xf27950)
        .setDescription(
            'Die Id, die Sie angegeben haben ist keine gültige TUM Id, bitte versuchen Sie es nochmal.'
        ),
    error_id_en: new EmbedBuilder()
        .setTitle('Invalid TUM Id!')
        .setColor(0xf27950)
        .setDescription(
            'The TUM Id you specified is invalid. Please try again.'
        ),
    error_id_ru: new EmbedBuilder()
        .setTitle('Неверный ID ТУМа')
        .setColor(0xf27950)
        .setDescription(
            'ID, который вы представили неверен. Попробуйте ещё раз.'
        ),
    error_id_ch: new EmbedBuilder()
        .setTitle('无效的TUM ID !')
        .setColor(0xf27950)
        .setDescription('这是个无效的TUM Id, 请您再次尝试并输入有效的Id。'),

    /*
     * This embed follows the third if the the verification hash is invalid.
     */
    error_hash_de: new EmbedBuilder()
        .setTitle('Ungültiger Hash!')
        .setColor(0xf27950)
        .setDescription(
            'Bitte geben Sie den Hash ein, den Sie in der email gekriegt haben.'
        ),
    error_hash_en: new EmbedBuilder()
        .setTitle('Invalid hash!')
        .setColor(0xf27950)
        .setDescription(
            'Please provide the hash which you received in your email.'
        ),
    error_hash_en: new EmbedBuilder()
        .setTitle('Неверный код')
        .setColor(0xf27950)
        .setDescription('Мы просим вас представить код полученный в е-майле'),
    error_hash_ch: new EmbedBuilder()
        .setTitle('无效的认证码！')
        .setColor(0xf27950)
        .setDescription('请您再次输入您由邮件收到的认证码。'),
}
