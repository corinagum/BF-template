import fetch from 'node-fetch';

export default async function renewDirectLineToken(token: string): Promise<JSON> {
  const { TOKEN_SERVER_DIRECT_LINE_URL } = process.env;
  const domain = TOKEN_SERVER_DIRECT_LINE_URL || '';

  console.log(`Renewing DirectLine token using token ending '${token.substr(-4)}`);

  // TODO: Add DIRECT_LINE_URL variable to enable use of (e.g.) DL ASE
  const tokenResponse = await fetch(`https://directline.botframework.com/v3/directline/tokens/refresh`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (tokenResponse.status === 200) {
    const json = await tokenResponse.json();

    if ('error' in json) {
      throw new Error(`DirectLine service responded with ${JSON.stringify(json.error)} when renewing the token`);
    } else {
      return json;
    }
  } else {
    throw new Error(`DirectLine service returned ${tokenResponse.status} when renewing the token`);
  }
}
