require('dotenv').config();

import Discord, { Client, Message } from 'discord.js';
import { db } from './db';
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
  if (msg.author.bot || !msg.content.startsWith(prefix)) {
    return;
  }

  const args: string[] = msg.content.slice(prefix.length).split(' ');
  const action: string = (args.shift() as string).toLowerCase();

  if (commands[action]) {
    commands[action].func({ msg, args, bot });
  }
};

/**
 * Handles Bot initialization
 * @param {Client} bot - Discord Bot
 */
const onReady = (bot: Client) => {
  db.sync();
  console.log(`Logged in as ${bot.user?.tag}`);
};

const onDisconnect = () => {
  db.close();
};

/**
 * Main Functionality
 */
const main = () => {
  const bot = new Discord.Client();
  bot.on('ready', () => onReady(bot));
  bot.on('message', (msg: Message) => onMessage(msg, bot));
  bot.on('disconnect', onDisconnect);
  bot.login(auth.token);
};

main();
