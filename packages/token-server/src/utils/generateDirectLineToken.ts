import fetch from 'node-fetch';
import createUserId from './createUserId';

//TODO: Refactor
export default async function generateDirectLineToken(): Promise<JSON> {
  // TODO: refactor (used in renewDirectLineToken too)
  const { DIRECT_LINE_SECRET } = process.env;
  const userId = createUserId();

  console.log(
    `Generating DirectLine token using secret ending '${DIRECT_LINE_SECRET.substr(-4)} and user ID ${userId}`
  );
  // TODO: Add DIRECT_LINE_URL variable to enable use of (e.g.) DL ASE (DIFFERENT from trustedOrigins)
  const tokenResponse = await fetch(`https://directline.botframework.com/v3/directline/tokens/generate`, {
    body: JSON.stringify({
      user: { id: userId },
      trustedOrigins: ['https://corinagum.github.io'] // TODO: add app service url for token server to this array, static host, and localhost
    }),
    headers: {
      authorization: `Bearer ${DIRECT_LINE_SECRET}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (tokenResponse.status !== 200) {
    console.log(await tokenResponse.text());

    throw new Error(`DirectLine service returned ${tokenResponse.status} when generating a new token`);
  }

  const json = await tokenResponse.json();

  if ('error' in json) {
    throw new Error(`DirectLine service responded with ${JSON.stringify(json.error)} when generating a new token`);
  }

  return { ...json, userId };
}
