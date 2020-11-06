import { Message, Role } from 'discord.js';
import { CommandProps } from '../utils/types';

const allowedRoles = [
  'anime',
  'tech',
  'art',
  'cars',
  'music',
  'programming',
  'fitness',
];

function getRolesAndIds(msg: Message) {
  return msg.guild.roles.cache.reduce((acc, role: Role) => {
    if (allowedRoles.includes(role.name)) {
      acc[role.name] = role.id;
    }
    return acc;
  }, {});
}

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
};
