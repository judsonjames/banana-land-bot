require('dotenv').config();

import Discord, {
  Client,
  GuildMember,
  Message,
  MessageEmbed,
  Role,
} from 'discord.js';
import { db } from './db';
import commands from './utils/commands';
import { banana_color } from './utils/common';

const prefix: string = process.env.BOT_PREFIX as string;
const auth = { token: process.env.TOKEN };

/**
 * Handles all new and incoming messages from Discord
 * @param {Message} msg - Message API
 * @param {Client} bot - Discord Bot
 */
const onMessage = (msg: Message) => {
  if (msg.author.bot || !msg.content.startsWith(prefix)) {
    return;
  }
  const bot: Client = msg.client;
  const args: string[] = msg.content.slice(prefix.length).split(' ');
  const action: string = (args.shift() as string).toLowerCase();

  if (commands[action]) {
    commands[action].func({ msg, args, bot });
  }
};

/**
 * Handles whatever happens when a new user joins the Server
 * @param {GuildMember} member - guild member joining the server
 */
const onGuildMemberAdd = (member: GuildMember) => {
  const freshBanana: Role = member.guild.roles.cache.find(
    (r) => r.name === 'Fresh Banana'
  );
  freshBanana && member.roles.add(freshBanana);

  // Send message to 'general' channel
  const general = member.guild.channels.cache.find((c) => c.name === 'general');
  if (general.isText()) {
    const welcomeMessage: MessageEmbed = new Discord.MessageEmbed()
      .setColor(banana_color)
      .setTitle(`${member.user.username} joined ${member.guild.name}`)
      .setDescription('Be nice, and have fun')
      .setThumbnail(member.user.avatarURL())
      .setTimestamp();
    general.send(welcomeMessage);
  }
};

/**
 * Handler for when members leave the guild
 * @param {GuildMember} member - guild member leaving the server
 */
const onGuildMemberRemove = (member: GuildMember) => {
  const general = member.guild.channels.cache.find((c) => c.name === 'general');
  if (general.isText()) {
    const exitMessage: MessageEmbed = new Discord.MessageEmbed()
      .setColor(banana_color)
      .setTitle(`${member.user.username} left ${member.guild.name}`)
      .setDescription('They must have slipped on a banana peel')
      .setThumbnail(member.user.avatarURL())
      .setTimestamp();
    general.send(exitMessage);
  }
};

/**
 * Handles Bot initialization
 */
const onReady = () => {
  db.sync().then(() => console.log('Initialized...'));
};

/**
 * Handles Bot disconnect
 */
const onDisconnect = () => {
  db.close().then(() => console.log('Shutting down...'));
};

/**
 * Main Functionality
 */
const main = () => {
  const bot: Client = new Discord.Client();
  bot.on('ready', onReady);
  bot.on('guildMemberAdd', onGuildMemberAdd);
  bot.on('guildMemberRemove', onGuildMemberRemove);
  bot.on('message', onMessage);
  bot.on('disconnect', onDisconnect);
  bot.login(auth.token);
};

main();
