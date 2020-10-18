import { eyengineer, left_mouth, right_mouth } from '../utils/emojis';
import { CommandProps } from '../utils/types';

/**
 * Health Check for the Server
 * @param {CommandProps} props
 */
const ping = ({ msg }: CommandProps) => {
  msg.channel.send('pong');
};

/**
 * Just says Hi to whoever says hi to it
 * @param {CommandProps} props
 */
const sayHi = ({ msg }: CommandProps) => {
  msg.channel.send(`Hi ${msg.author.username}`);
};

const smile = ({ msg }: CommandProps) => {
  msg.channel.send(`${left_mouth}${right_mouth}`);
};

const ohyeah = ({ msg }: CommandProps) => {
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
