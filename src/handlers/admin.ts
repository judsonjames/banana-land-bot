import { GuildChannel, MessageEmbed } from 'discord.js';
import { banana_color } from '../utils/common';
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

const createInterest = ({ msg, args, bot }: CommandProps) => {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    const interest: string = args[0].toLowerCase();
    const category: GuildChannel = msg.guild.channels.cache.find(
      (c) => c.name.toLowerCase() === 'interests' && c.type === 'category'
    );
    const existing = msg.guild.channels.cache.find((c) => c.name === interest);
    if (existing) {
      msg.channel.send(`The interest already exists, check <#${existing.id}>`);
      return;
    }
    msg.guild.roles.create({ data: { name: interest } }).then(async (role) => {
      const channel = await msg.guild.channels.create(interest, {
        reason: `Created by ${msg.author.username}`,
        type: 'text',
        parent: category,
        permissionOverwrites: [
          {
            id: role.id,
            allow: [
              'READ_MESSAGE_HISTORY',
              'SEND_MESSAGES',
              'SEND_TTS_MESSAGES',
              'EMBED_LINKS',
              'ATTACH_FILES',
              'USE_EXTERNAL_EMOJIS',
              'ADD_REACTIONS',
              'VIEW_CHANNEL',
            ],
          },
          {
            id: category.guild.roles.everyone.id,
            deny: ['VIEW_CHANNEL'],
          },
        ],
      });
      const message: MessageEmbed = new MessageEmbed()
        .setColor(banana_color)
        .setTitle(`New Interest: ${interest}`)
        .setDescription(
          `You can check it out at <#${channel.id}>\nSubscribe to the channel with \`b!subscribe ${interest}\``
        );
      msg.channel.send(message);
    });
  }
};

export default {
  jail: {
    args: '<user>',
    usage: 'Only Mods: Remove all Roles and Mute them',
    func: jail,
  },
  'create-interest': {
    args: '<interest>',
    usage: 'Only Mods: Create new interest channel and associated role',
    func: createInterest,
  },
};
