import admin from '../handlers/admin';
import general from '../handlers/general';
import sayings from '../handlers/sayings';
import subscriptions from '../handlers/subscriptions';
import testing from '../handlers/testing';
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
  const usableCommands = msg.member.hasPermission('ADMINISTRATOR')
    ? commands
    : nonAdminCommands;

  arg && usableCommands[arg]
    ? response.push(
        `${prefix}${arg} ${usableCommands[arg].args}`,
        `${usableCommands[arg].usage}`
      )
    : Object.keys(usableCommands).forEach((action: string) =>
        response.push(`${prefix}${action} ${usableCommands[action].args}`)
      );

  // @ts-ignore
  bot.users.cache.get(msg.author.id).send(response);
};

// Commands that are available to all users
const nonAdminCommands: CommandsHash = {
  help: {
    args: '<none> or <command name>',
    usage: 'General Help Command',
    func: helpResponse,
  },
  ...general,
  ...sayings,
  ...subscriptions,
};

// Contains all commands, including ones available to admins
const commands: CommandsHash = {
  ...nonAdminCommands,
  ...admin,
  ...testing,
};

export default commands;
