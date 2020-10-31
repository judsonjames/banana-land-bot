import { Message, Role } from 'discord.js';
import { CommandProps } from '../utils/types';

const allowedRoles = ['anime', 'tech', 'art', 'cars', 'music', 'programming'];

function getRolesAndIds(msg: Message) {
  return msg.guild.roles.cache.reduce((acc, role: Role) => {
    if (allowedRoles.includes(role.name)) {
      acc[role.name] = role.id;
    }
    return acc;
  }, {});
}

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

const interests = ({ msg, bot }: CommandProps) => {
  bot.users.cache
    .get(msg.author.id)
    .send(`The following commands are available: \n${allowedRoles.join('\n')}`);
};

const subscribe = ({ msg, args }: CommandProps) => {
  const roles = getRolesAndIds(msg);
  const subscribed: string[] = [];
  args.forEach((role: string) => {
    if (roles[role]) {
      msg.member.roles.add(roles[role]);
      subscribed.push(role);
    }
  });
  msg.channel.send(
    `Subscribed to: ${subscribed.length ? subscribed.join(',') : 'nothing'}`
  );
};

const unsubscribe = ({ msg, args }: CommandProps) => {
  const roles = getRolesAndIds(msg);
  const unsubscribed: string[] = [];
  args.forEach((role: string) => {
    if (roles[role]) {
      msg.member.roles.remove(roles[role]);
      unsubscribed.push(role);
    }
  });
  msg.channel.send(
    `Unsubscribed from: ${
      unsubscribed.length ? unsubscribed.join(',') : 'nothing'
    }`
  );
};

export default {
  subscribe: {
    args: '<role> or <roles>',
    usage: "Subscribe to a specific channel's roles",
    func: subscribe,
  },
  unsubscribe: {
    args: '<role> or <roles>',
    usage: 'Unsubscribe from a specific channel',
    func: unsubscribe,
  },
  'get-interests': {
    args: '<none>',
    usage: "Get list of available interest roles to your DM's",
    func: interests,
  },
  jail: {
    args: '<user>',
    usage: 'Only Mods: Remove all Roles and Mute them',
    func: jail,
  },
};
