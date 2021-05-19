# Bot Template

This package sets up a template bot server, for the following purposes

- Set up a ready-to-go bot (`TemplateBot`)
- Easily extend the template bot to your own specifications in a new bot
- Simple creation, service setup, and deployment
- Documentation that expands on [BotBuilder Samples](https://github.com/microsoft/BotBuilder-Samples/) and [Bot Framework SDK](https://docs.microsoft.com/bs-cyrl-ba/azure/bot-service/index-bf-sdk?view=azure-bot-service-4.0)

## Getting started

1. Create the `.env` file in `bot/`

   Update the following variables (note that optional variables are commented out):
   `bot/.env`:

```
MICROSOFT_APP_ID=
MICROSOFT_APP_PASSWORD=
#Optional:
#BOT_NAME=BF-template-bot
#BOT_PORT=
```

1. Install modules in `bot` and start the server

   ```bash
   cd packages/<bot>
   yarn install
   yarn start
   ```

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.3.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

## Further reading

- [GitHub repository templates](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#about-repository-templates)

- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
- [Azure Portal](https://portal.azure.com)
- [Language Understanding using LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/)
- [Channels and Bot Connector Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [TypeScript](https://www.typescriptlang.org)
- [Restify](https://www.npmjs.com/package/restify)
- [dotenv](https://www.npmjs.com/package/dotenv)
