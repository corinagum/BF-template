# BF-template

## Project Summary

This is a template for building a [monorepo](https://en.wikipedia.org/wiki/Monorepo) of resources for Bot Framework bot development and deployment.

This project contains multiple parts. Please see the descriptions below for an understanding of the overall project. Package `README.md` files contain more information pertaining to that particular package.

1. `bot` package:
   - Provides basic bot setup information
   - `TemplateBot.ts` is a _basic echo bot_, which iterates on the [BotBuilder TypeScript Samples](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/)
     - Provides a jumpstart bot to speed up development
   - `index.ts` is the basic server setup for running the bot
1. `bot-offline` package:
   - Provides browser bot setup information
   - `createDirectLine` is a _custom Bot Adapter_ that is [hosted in the browser](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_es6/01.browser-echo#adapters). This creates a custom `WebChatAdapter` to:
     - Offload server behavior onto client machine
     - Reduce latency - very helpful for testing non-production bots
   - This package can use `TemplateBot.ts` from `bot/` to jumpstart development
1. `commands` package:
   - Commands intended for both hosted and browser bots are saved here
     - This allows for DRY bot production where commands for multiple bots don't need to be written multiple times
     - `legacy/` contains deprecated code from [BotFramework MockBot](https://github.com/compulim/BotFramework-MockBot), which need to be migrated to `src/`
     - `src/` contains updated commands for testing bot features
1. `token-server` package:
   - Provides token server setup that fetches a token for the bot using the bot secret for better security
   - Sets up token fetching and renewal for multiple services:
     - Direct Line
     - <a href="#notes"><sup>\*</sup></a> Direct Line ASE
     - <a href="#notes"><sup>\*</sup></a> Cognitive Speech Services
   - Trusted origin templating for hosted resources

<a name="*note"></a>\* These services have not yet been implemented into the project</a>

### Not sure where to start?

Basic deployment will need the bot and token server, so check those packages first.

## Setup

1. [Create a repository from this template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)
1. Set up the bot and token server
   - Developers using this template will most likely want to start with the `bot/` and `token-server/` packages.
   - See the individual package `README.md` for detailed setup instructions

---
