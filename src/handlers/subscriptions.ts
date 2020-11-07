import { Message, Role } from 'discord.js';
import { CommandProps } from '../utils/types';

/**
 * Helper Method to get Roles and IDs
 * @param {Message} msg - message object
 */
function getRolesAndIds(msg: Message) {
  const interests = getInterests(msg);
  return msg.guild.roles.cache.reduce((acc, role: Role) => {
    if (interests.includes(role.name)) {
      acc[role.name] = role.id;
    }
    return acc;
  }, {});
}

/**
 * Helper Method to help get interests consistently
 * @param {Message} msg - message object
 */
function getInterests(msg: Message) {
  return msg.guild.channels.cache.reduce((acc, channel) => {
    if (channel?.parent?.name === 'interests') {
      acc.push(channel.name);
    }
    return acc;
  }, []);
}

/**
 * Get the Interests assocaited with the guild
 * @param {CommandProps} props
 */
const interests = ({ msg, bot }: CommandProps) => {
  bot.users.cache
    .get(msg.author.id)
    .send(
      `The following interests are available in ${
        msg.guild.name
      }: \n${getInterests(msg).join(
        '\n'
      )}\nYou can join any of these with \`b!subscribe <interest>\``
    );
};

/**
 * Subscribe to interest by assigning a role to the user that asked to join
 * the interest group.
 * @param {CommandProps} props
 */
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

/**
 * Unsubscribe to an interest by removing the role from the user
 * @param {CommandProps} props
 */
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
