import { Server } from 'restify';
import generateServiceToken from '../../utils/generateServiceToken';
import renewDirectLineToken from '../../utils/renewServiceToken';

/**
 * Generate a one-off token for 'standard' bot use
 */
export default function postDirectLineToken(server: Server): void {
  server.post('/api/token/directline', async (req, res) => {
    try {
      // Need trusted origin handling
      // const origin = req.header('origin');

      const { token } = req.query;

      try {
        const result = await (token ? renewDirectLineToken(token) : generateServiceToken());

        res.sendRaw(JSON.stringify(result, null, 2), {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        });
      } catch (err) {
        res.send(500, err.message, { 'Access-Control-Allow-Origin': '*' });
      }
    } catch (err) {
      res.send(500, { message: err.message, stack: err.stack }, { 'Access-Control-Allow-Origin': '*' });
    }
  });
}
