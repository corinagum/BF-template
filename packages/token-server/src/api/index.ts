import { Server } from 'restify';
import getTokenListDirectLine from './directLine/get';
import postDirectLineToken from './directLine/post';

/**
 * Run all token-server api's
 * @param server token server
 */
export default async function (server: Server): Promise<void> {
  await Promise.all([getTokenListDirectLine, postDirectLineToken].map(handler => handler(server)));
}
