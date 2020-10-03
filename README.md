# Banana Land's Protector, the Banana Bot

### Initialization

- Ensure that you are using Node 14 for this project
- Clone this repo and install modules
- Create a Discord Bot [link here](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/)
- Find your auth token for the bot, and keep it on hand
- Create an `.env` file with the following fields
  - `BOT_PREFIX` : whatever you want your prefix to be, I'm using `b!`
  - `TOKEN`: The token mentioned earlier
- Add the bot to a server you want to use for testing
- Run the bot locally using `yarn dev`
- Use a command with the bot. `<prefix>help` will DM you all commands available

### Creating New Commands

There is a Map that contains function references to all available commands. To create a new command:

- Open `src/utils/commands.ts` and scroll to the `commands` object
- Read what the `CommandsHash` requires for a `Command` object, and do not duplicate keys
- Follow the parameters listed in the already created commands
- Because `ts-node-dev` is refreshing the server as you save files, it will restart the server
- The console will tell you when the bot is online, and you can test commands

### Testing

- When done developing functionality for the bot, run the `yarn build` and `yarn start` commands
  to ensure that the functionality will work in the transpiled version (ES5)

### Code Formatting and Styling

- This project uses TypeScript, use it to the best of its ability
