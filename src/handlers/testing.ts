import { CommandProps } from '../utils/types';

/**
 * Test Command to simulate a user joining the server
 * @param {CommandProps} props
 */
const fakeUserJoin = ({ msg, bot }: CommandProps) => {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    bot.emit('guildMemberAdd', msg.member);
  }
};

/**
 * Test Command to simulate a user leaving the server
 * @param { CommandProps } - command props
 */
const fakeUserLeave = ({ msg, bot }: CommandProps) => {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    bot.emit('guildMemberRemove', msg.member);
  }
};

export default {
  'fake-join': {
    args: '<none>',
    usage: 'TEST COMMAND :: used to simulate user joining',
    func: fakeUserJoin,
  },
  'fake-leave': {
    args: '<none>',
    usage: 'TEST COMMAND :: used to simulate user leaving',
    func: fakeUserLeave,
  },
};
