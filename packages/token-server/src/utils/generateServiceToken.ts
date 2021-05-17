import fetch from 'node-fetch';
import { DirectLineTokenData, DirectLineTokenRequestBody } from '../DirectLineTypes';
import calculateExpiresAt from './calculateExpiresAt';
import createUserId from './createUserId';

//TODO: Refactor
export default async function generateServiceToken(): Promise<DirectLineTokenData> {
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
  const response = await fetch(`${domain}v3/directline/tokens/generate`, httpRequest);

  if (response.status !== 200) {
    console.log(await response.text());

    throw new Error(`DirectLine service returned ${response.status} when generating a new token`);
  }

  const json: DirectLineTokenData = await response.json();

  if ('error' in json) {
    // rename when adding DL ASE
    throw new Error(`DirectLine service responded with ${JSON.stringify(json.error)} when generating a new token`);
  }
  const expiresAt = calculateExpiresAt(json.expires_in);

  return { ...json, expires_at: expiresAt, userId };
}
