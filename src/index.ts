import { BotFrameworkAdapter, InputHints, TurnContext } from 'botbuilder';
import { config } from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';

const ENV_FILE = path.join(__dirname, '..', '.env');
config({ path: ENV_FILE });

/* HTTP Server */
const server = restify.createServer();
server.name = process.env.BOT_NAME;
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\n ${server.name} server listening to ${server.url}`);
});

/* BotFrameworkAdapter: https://aka.ms/about-bot-adapter */
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

/* Error handling */
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
  console.error(`\n ${server.name}: [onTurnError] unhandled error: ${error}`);

  /* Send trace activity to display errors in Emulator (locally running bot)
    https://docs.microsoft.com/en-us/azure/bot-service/using-trace-activities?view=azure-bot-service-4.0&tabs=javascript
  */
  await context.sendTraceActivity(
    'OnTurnError Trace',
    `${error}`,
    'https://www.botframework.com/schemas/error',
    `${process.env.BOT_NAME} TurnError`
  );

  const onTurnErrorMessage = `${process.env.BOT_NAME} encountered an error. Please fix the bot source code.`;

  await context.sendActivity(onTurnErrorMessage, onTurnErrorMessage, InputHints.IgnoringInput);
};

adapter.onTurnError = onTurnErrorHandler;
