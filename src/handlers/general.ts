import { Client, Message } from 'discord.js';
import { Args } from '../utils/types';

/**
 * Health Check for the Server
 * @param {Message} msg - Message API
 */
const ping = (msg: Message) => {
  msg.channel.send('pong');
};

/**
 * Just says Hi to whoever says hi to it
 * @param {Message} msg - Message API
 * @param {Args} args - Command Arguments
 * @param {Client} bot - Discord Bot
 */
const sayHi = (msg: Message, args: Args, bot: Client) => {
  msg.channel.send(`Hi ${msg.author.username}`);
};

export default {
  ping,
  sayHi,
};
