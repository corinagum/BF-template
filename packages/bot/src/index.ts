import { BotFrameworkAdapter, InputHints, TurnContext } from 'botbuilder';
import { config } from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import { EchoBot } from './bot';


/*
* CONFIGURE ENV
* - Add PORT=3978 if not specified in root .env
* - Next set PUBLIC_URL (proxy bot url) for development mode
* - process.env = RESOLVED_ENV
*/
config();
const ENV_FILE: any = path.join(__dirname, '../../../', '.env');

const RESOLVED_ENV = {
  PORT: 3978,
  ...ENV_FILE
};

RESOLVED_ENV.PUBLIC_URL = `http://localhost:${ RESOLVED_ENV.PORT }/public`
process.env = { ...RESOLVED_ENV }

/* HTTP SERVER */
const server = restify.createServer();
const botName = RESOLVED_ENV.BOT_NAME;

server.name = botName;
server.listen(RESOLVED_ENV.PORT, () => {
  console.log(`\n ${botName} server listening to ${server.url}`);
});

/* BotFrameworkAdapter: https://aka.ms/about-bot-adapter */
const adapter = new BotFrameworkAdapter({
  appId: RESOLVED_ENV.MICROSOFT_APP_ID,
  appPassword: RESOLVED_ENV.MICROSOFT_APP_PASSWORD
});

/* Error handling */
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
  console.error(`\n ${botName}: [onTurnError] unhandled error: ${error}`);

  /* Send trace activity to display errors in Emulator (locally running bot)
    https://docs.microsoft.com/en-us/azure/bot-service/using-trace-activities?view=azure-bot-service-4.0&tabs=javascript
  */
  await context.sendTraceActivity(
    'OnTurnError Trace',
    `${error}`,
    'https://www.botframework.com/schemas/error',
    `${botName} TurnError`
  );

  const onTurnErrorMessage = `${botName} encountered an error. Please fix the bot source code.`;

  await context.sendActivity(onTurnErrorMessage, onTurnErrorMessage, InputHints.IgnoringInput);
};

adapter.onTurnError = onTurnErrorHandler;

const echoBot = new EchoBot();

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async context => {
    await echoBot.run(context);
  });
});
