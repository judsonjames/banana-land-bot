import { createQuote, getAllQuotes, getQuote, Quote } from '../db/quotes';
import { CommandProps } from '../utils/types';

const arkanisms = require('../../data/arkanisms.json');

/**
 * `We need to have a command to quote Arkane!` - JuanCena
 * @param {CommandProps} props
 */
const sayArkanism = ({ msg, args }: CommandProps) => {
  const key: string = args[0];
  if (key && arkanisms[key]) {
    msg.channel.send(`Arkane: ${arkanisms[key]}`);
  }
};

const addQuote = ({ msg, args }: CommandProps) => {
  const key: string = args[0];
  const quote: string = args.splice(1).join(' ');
  const author: string = msg.author.id;
  if (key && quote && author) {
    createQuote({ key, quote, author })
      .then((res: string) => {
        msg.channel.send(res);
      })
      .catch((err) => {
        msg.channel.send(`ERROR :: ${err}`);
      });
  }
};

const findQuote = ({ msg, args, bot }: CommandProps) => {
  const key: string = args[0];
  if (key) {
    getQuote(key)
      .then(async (res: Quote) => {
        const user = await bot.users.fetch(res.author);
        msg.channel.send(`\`@${user.username}\`\n> ${res.quote}`);
      })
      .catch((err) => {
        msg.channel.send(`ERROR :: ${err}`);
      });
  }
};

const listQuotes = ({ msg, bot }: CommandProps) => {
  const keys: string[] = [];
  getAllQuotes()
    .then((quotes: Quote[]) => {
      quotes.forEach((q: Quote) => {
        keys.push(q.key);
      });
      bot.users.cache.get(msg.author.id).send(keys.join('\n'));
    })
    .catch((err) => {
      msg.channel.send('ERROR :: ', err);
    });
};

export default {
  arkanism: {
    args: '<key>',
    usage: 'Quote Arkane',
    func: sayArkanism,
  },
  'list-quotes': {
    args: '<key>',
    usage: 'something',
    func: listQuotes,
  },
  quote: {
    args: 'asdf',
    usage: 'something',
    func: findQuote,
  },
  'add-quote': {
    args: 'asdf',
    usage: 'something',
    func: addQuote,
  },
};
