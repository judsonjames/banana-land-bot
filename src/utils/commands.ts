import { Client, Message } from 'discord.js';
import general from '../handlers/general';
import { Args, CommandsHash } from './types';

/**
 * General Purpose Helper Message
 * @param {Message} msg - Discord Message
 * @param {Args} args - Arguments from Command
 * @param {Client} bot - Discord Client
 */
const helpResponse = (msg: Message, args: Args, bot: Client) => {
  const arg: string = args[0];
  const prefix: string = process.env.BOT_PREFIX as string;
  const response: string[] = [];

  arg && commands[arg]
    ? response.push(
        `${prefix}${arg} ${commands[arg].args}`,
        `${commands[arg].usage}`
      )
    : Object.keys(commands).forEach((action: string) =>
        response.push(`${prefix}${action} ${commands[action].args}`)
      );

  // @ts-ignore
  bot.users.cache.get(msg.author.id).send(response);
};

const commands: CommandsHash = {
  help: {
    args: '<none> or <command name>',
    usage: 'General Help Command',
    func: helpResponse,
  },
  ping: {
    args: '<none>',
    usage: 'Just checks that the server is alive',
    func: general.ping,
  },
  sayhi: {
    args: '<none>',
    usage: 'Says Hi to whoever says Hi',
    func: general.sayHi,
  },
};

export default commands;
