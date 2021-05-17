import { config } from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import setupAPI from './api/index';

const ENV_FILE: string = path.join(__dirname, '..', '.env');
config({ path: ENV_FILE });

const TOKEN_SERVER_PORT = '5000';
process.env.TOKEN_SERVER_PORT = TOKEN_SERVER_PORT;

['DIRECT_LINE_SECRET'].forEach(name => {
  if (!process.env[name]) {
    throw new Error(`\ntoken-server: The required environment variable ${name} is undefined`);
  }
});

/* SETUP HTTP TOKEN-SERVER */
const server = restify.createServer();

server.listen(TOKEN_SERVER_PORT, () => {
  console.log(`\ntoken-server listening to ${TOKEN_SERVER_PORT}`);
});

setupAPI(server);
