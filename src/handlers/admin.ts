import { CommandProps } from '../utils/types';

const jail = ({ msg, bot }: CommandProps) => {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    if (!msg.mentions.users.size) {
      msg.channel.send('A valid user was not specified.');
    }
    const selectedUser = msg.guild.member(msg.mentions.users.first());
    const jailRole = msg.guild.roles.cache.find((role) => role.name === 'jail');

    // Remove all roles associated with the role and reassign with the 'jail' role
    msg.guild.roles.cache.forEach((role) => selectedUser.roles.remove(role.id));
    selectedUser.roles.add(jailRole.id);
  } else {
    bot.users.cache
      .get(msg.author.id)
      .send('You do not have permission to jail users.');
  }
};

export default {
  jail: {
    args: '<user>',
    usage: 'Only Mods: Remove all Roles and Mute them',
    func: jail,
  },
};
