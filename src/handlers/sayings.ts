import { Client, Message } from 'discord.js';
import { Args, Hash } from '../utils/types';

const sayingsFile: string = '../../data/sayings.json';

const arkanisms = require('../../data/arkanisms.json');
const allSayings = require(sayingsFile);

type Saying = Hash<string>;
type UserSayings = Hash<Saying>;

const listSayings = (msg: Message, args: Args, bot: Client) => {
  // @ts-ignore
  bot.users.cache
    .get(msg.author.id)
    .send(JSON.stringify(allSayings[msg.author.id]));
};

const addSaying = (msg: Message, args: Args, bot: Client) => {
  const user = bot.users.cache.find((user) => user.id === msg.author.id);
  const key: string = args[0];
  const newSaying: string = args.splice(1).join(' ');

  if (!user || !key || !newSaying) {
    msg.channel.send('Not Enough Arguments!');
    return;
  }

  const userSayings: Saying = allSayings && allSayings[user.id];

  if (!userSayings[key]) {
    userSayings[key] = newSaying;
    msg.channel.send(`${key}: ${userSayings[key]}`);
  }
};

const useSaying = (msg: Message, args: Args, bot: Client) => {
  const user = bot.users.cache.find((user) => user.id === msg.author.id);
  const saying: string = args[0];

  if (!user || !saying) {
    msg.channel.send('Not Enough Arguments!');
    return;
  }
  const userSayings: UserSayings = allSayings && allSayings[user.id];
  if (userSayings[saying]) {
    msg.channel.send(`<@${user.id}>\n> ${userSayings[saying]}`);
  }
};

/**
 * `We need to have a command to quote Arkane!` - JuanCena
 * @param {Message} msg - Discord Message API
 * @param {Args} args - Args provided from Command
 */
const sayArkanism = (msg: Message, args: Args) => {
  const key: string = args[0];
  if (key && arkanisms[key]) {
    msg.channel.send(`Arkane: ${arkanisms[key]}`);
  }
};

export default {
  arkanism: {
    args: '<key>',
    usage: 'Quote Arkane',
    func: sayArkanism,
  },
  quote: {
    args: '<key>',
    usage: 'something',
    func: useSaying,
  },
  'add-quote': {
    args: '<key>',
    usage: 'something',
    func: addSaying,
  },
  'list-sayings': {
    args: '<key>',
    usage: 'something',
    func: listSayings,
  },
};
