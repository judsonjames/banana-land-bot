require('dotenv').config();

import Discord, { Client, Message } from 'discord.js';
import commands from './utils/commands';

const prefix: string = process.env.BOT_PREFIX as string;
const auth = {
  token: process.env.TOKEN,
};

/**
 * Handles all new and incoming messages from Discord
 * @param {Message} msg - Message API
 * @param {Client} bot - Discord Bot
 */
const onMessage = (msg: Message, bot: Client) => {
  if (msg.author.bot || (prefix && !msg.content.startsWith(prefix))) {
    return;
  }

  const commandBody: string = msg.content.slice(prefix.length);
  const args: string[] = commandBody.split(' ');
  const action: string = (args.shift() as string).toLowerCase();

  if (!commands[action]) {
    msg.reply('The command provide is invalid');
    return;
  }
  commands[action].func(msg, args, bot);
};

/**
 * Handles Bot initialization
 * @param {Client} bot - Discord Bot
 */
const onReady = (bot: Client) => {
  console.log(`Logged in as ${bot.user?.tag}`);
};

const main = () => {
  const bot = new Discord.Client();
  bot.on('ready', () => onReady(bot));
  bot.on('message', (msg: Message) => onMessage(msg, bot));
  bot.login(auth.token);
};

main();
