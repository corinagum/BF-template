import { BotFrameworkAdapter, InputHints, TurnContext } from 'botbuilder';
import { config } from "dotenv";
import * as path from 'path';
import * as restify from 'restify';
import { TemplateBot } from './TemplateBot';


/*
* CONFIGURE ENV
* - Add BOT_PORT=3978 if not specified in root .env
* - Next set PUBLIC_URL (proxy bot url) for development mode to use designated port
*/
const ENV_FILE: any = path.join(__dirname, '../../../', '.env');

config({ path: ENV_FILE })

process.env.BOT_PORT = process.env.BOT_PORT || '3978';
process.env.BOT_NAME = process.env.BOT_NAME || 'Bot';

const { BOT_NAME, BOT_PORT, MICROSOFT_APP_ID, MICROSOFT_APP_PASSWORD } = process.env;

process.env.PUBLIC_URL = `http://localhost:${ BOT_PORT }/public`;

/* SETUP HTTP SERVER */
const server = restify.createServer();

server.name = BOT_NAME || 'Bot';
server.listen(BOT_PORT, () => {
  console.log(`\n ${BOT_NAME} server listening to ${server.url}`);
});

/* CREATE BOTFRAMEWORKaDAPTER
* https://aka.ms/about-bot-adapter
*/
const adapter = new BotFrameworkAdapter({
  appId: MICROSOFT_APP_ID,
  appPassword: MICROSOFT_APP_PASSWORD
});

/* Error handling */
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
  console.error(`\n ${BOT_NAME}: [onTurnError] unhandled error: ${error}`);

  /* Send trace activity to display errors in Emulator (locally running bot)
    https://docs.microsoft.com/en-us/azure/bot-service/using-trace-activities?view=azure-bot-service-4.0&tabs=javascript
  */
  await context.sendTraceActivity(
    'OnTurnError Trace',
    `${error}`,
    'https://www.botframework.com/schemas/error',
    `${BOT_NAME} TurnError`
  );

  const onTurnErrorMessage = `${BOT_NAME} encountered an error. Please fix the bot source code.`;

  await context.sendActivity(onTurnErrorMessage, onTurnErrorMessage, InputHints.IgnoringInput);
};

adapter.onTurnError = onTurnErrorHandler;

const echoBot = new TemplateBot();

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async context => {
    await echoBot.run(context);
  });
});
