import { CategoryChannel, ChannelType, Client, GuildMember } from 'discord.js'

/**
 * @param {GuildMember} member
 */
async function guildeMemberAdd(member) {
    console.log(member.user.tag, 'joined!')
}

/**
 * @export
 */
export default [
    {
        type: 'event',
        name: 'guildMemberAdd',
        run: guildeMemberAdd,
    },
]
