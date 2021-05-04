import fetch from 'node-fetch';
import { DirectLineTokenRequestBody, DirectLineTokenResponseJSON } from '../DirectLineTypes';
import createUserId from './createUserId';

//TODO: Refactor
export default async function generateDirectLineToken(): Promise<DirectLineTokenResponseJSON> {
  const { DIRECT_LINE_SECRET, TOKEN_SERVER_DIRECT_LINE_URL } = process.env;
  const domain = TOKEN_SERVER_DIRECT_LINE_URL || 'https://directline.botframework.com/';
  const userId = createUserId();

  console.log(
    `Generating DirectLine token using secret ending '${DIRECT_LINE_SECRET.substr(-4)} and user ID ${userId}`
  );

  const dLTokenRequestBody: DirectLineTokenRequestBody = {
    user: { id: userId },
    trustedOrigins: ['https://corinagum.github.io'] // TODO: add app service url for token server to this array, static host, and localhost
  };
  const httpRequest = {
    body: JSON.stringify(dLTokenRequestBody),
    headers: {
      authorization: `Bearer ${DIRECT_LINE_SECRET}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };
  const tokenResponse = await fetch(`${domain}v3/directline/tokens/generate`, httpRequest);

  if (tokenResponse.status !== 200) {
    console.log(await tokenResponse.text());

    throw new Error(`DirectLine service returned ${tokenResponse.status} when generating a new token`);
  }

  const json = await tokenResponse.json();

  if ('error' in json) {
    // rename when adding DL ASE
    throw new Error(`DirectLine service responded with ${JSON.stringify(json.error)} when generating a new token`);
  }

  const tokenResponseJSON: DirectLineTokenResponseJSON = {
    ...json,
    userId
  };

  return tokenResponseJSON;
}