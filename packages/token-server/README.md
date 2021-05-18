1. Create `.env` files in the `bot/` and `token-server/` directories

   Update the following variables (note that optional variables are commented out):
   `token-server/.env`:

```
DIRECT_LINE_SECRET=
#Optional:
#TOKEN_SERVER_DIRECT_LINE_URL=
```

1. Install modules in `token-server`

   ```bash
   cd packages/<bot>|<token-server>
   yarn install
   ```

1. Start the bot and token server in separate terminals:

   ```bash
   cd packages/<bot>|<token-server>
   yarn start
   ```
