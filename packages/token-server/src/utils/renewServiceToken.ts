import fetch from 'node-fetch';
import { DirectLineTokenResponseJSON } from '../DirectLineTypes';

export default async function renewDirectLineToken(token: string): Promise<DirectLineTokenResponseJSON> {
  const { TOKEN_SERVER_DIRECT_LINE_URL } = process.env;
  const domain = TOKEN_SERVER_DIRECT_LINE_URL || 'https://directline.botframework.com/';
  // TODO: rename when adding DL ASE
  console.log(`Renewing DirectLine token using token ending '${token.substr(-4)}`);

  const tokenResponse = await fetch(`${domain}v3/directline/tokens/refresh`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (tokenResponse.status === 200) {
    const json: DirectLineTokenResponseJSON = await tokenResponse.json();

    if ('error' in json) {
      // TODO: rename when adding DL ASE
      throw new Error(`DirectLine service responded with ${JSON.stringify(json.error)} when renewing the token`);
    } else {
      return json;
    }
  } else {
    // TODO: rename when adding DL ASE
    throw new Error(`DirectLine service returned ${tokenResponse.status} when renewing the token`);
  }
}
