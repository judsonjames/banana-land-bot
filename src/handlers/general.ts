import { Message } from 'discord.js';
import { eyengineer, left_mouth, right_mouth } from '../utils/emojis';

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
 */
const sayHi = (msg: Message) => {
  msg.channel.send(`Hi ${msg.author.username}`);
};

const smile = (msg: Message) => {
  msg.channel.send(`${left_mouth}${right_mouth}`);
};

const ohyeah = (msg: Message) => {
  msg.channel.send(`${eyengineer}${eyengineer}\n${left_mouth}${right_mouth}`);
};

export default {
  ping: {
    args: '<none>',
    usage: 'Just checks that the server is alive',
    func: ping,
  },
  sayhi: {
    args: '<none>',
    usage: 'Says Hi to whoever says Hi',
    func: sayHi,
  },
  smile: {
    args: '<none>',
    usage: 'Creepy Smile',
    func: smile,
  },
  ohyeah: {
    args: '<none>',
    usage: 'Oh Yeah',
    func: ohyeah,
  },
};
