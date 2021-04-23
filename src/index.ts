import { config } from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';


const ENV_FILE = path.join(__dirname, '..', '.env');
config({ path: ENV_FILE });

// import { BotFrameworkAdapter } from 'botbuilder';

//

const server = restify.createServer();
server.name = process.env.SERVER_NAME
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\n${server.name} listening to ${server.url}`);
})