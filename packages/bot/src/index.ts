import { BotFrameworkAdapter, InputHints, TurnContext } from 'botbuilder';
import { config } from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import { TemplateBot } from './TemplateBot';

/*
 * CONFIGURE ENV
 * - Add BOT_PORT=3978 if not specified in root .env
 * - Next set PUBLIC_URL (proxy bot url) for development mode to use designated port
 */
const ENV_FILE: string = path.join(__dirname, '..', '.env');

config({ path: ENV_FILE });

process.env.BOT_PORT = process.env.BOT_PORT || '3978';
process.env.BOT_NAME = process.env.BOT_NAME || 'Bot';

const { BOT_NAME, BOT_PORT, MICROSOFT_APP_ID, MICROSOFT_APP_PASSWORD } = process.env;

['MICROSOFT_APP_ID', 'MICROSOFT_APP_PASSWORD'].forEach(name => {
  if (!process.env[name]) {
    throw new Error(`\n${BOT_NAME}: The required environment variable ${name} is undefined`);
  }
});

process.env.PUBLIC_URL = `http://localhost:${BOT_PORT}/public`;

/* SETUP BOT HTTP SERVER */
const server = restify.createServer();

server.name = BOT_NAME || 'Bot';
server.listen(BOT_PORT, () => {
  console.log(`\n${BOT_NAME} server listening to ${server.url}`);
});

/* CREATE BOTFRAMEWORKADAPTER
 * https://aka.ms/about-bot-adapter
 */
const adapter = new BotFrameworkAdapter({
  appId: MICROSOFT_APP_ID,
  appPassword: MICROSOFT_APP_PASSWORD
});

/* ERROR HANDLING */
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
  console.error(`\n${BOT_NAME}: [onTurnError] unhandled error: ${error}`);

  /* Trace Activity for BotFramework Emulator:
   * https://docs.microsoft.com/en-us/azure/bot-service/using-trace-activities?view=azure-bot-service-4.0&tabs=javascript
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

/* INITIALIZE EVENT EMISSION */
const templateBot = new TemplateBot();

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async context => {
    await templateBot.run(context);
  });
});
