import general from '../handlers/general';
import sayings from '../handlers/sayings';
import subscriptions from '../handlers/subscriptions';
import { CommandProps, CommandsHash } from './types';

/**
 * General Purpose Helper Message
 * @param {Message} msg - Discord Message
 * @param {Args} args - Arguments from Command
 * @param {Client} bot - Discord Client
 */
const helpResponse = ({ msg, args, bot }: CommandProps) => {
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
  ...general,

  ...sayings,

  ...subscriptions,
};

export default commands;
