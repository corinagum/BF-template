import { ActivityHandler, MessageFactory, TurnContext } from 'botbuilder';

/*
 * CREATE TemplateBot ActivityHandler:
 * - https://docs.microsoft.com/en-us/javascript/api/botbuilder-core/activityhandler?view=botbuilder-ts-latest
 * Note: TemplateBot is a EchoBot; Use this file to jumpstart your custom bot
 */
export class TemplateBot extends ActivityHandler {
  constructor() {
    super();

    this.onMembersAdded(async (context: TurnContext, next) => {
      const membersAdded = context.activity.membersAdded;

      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          const localeText = `\nThis activity's locale is ${context.activity.locale || 'not defined'}`;
          const welcomeText = `Welcome, ${member.name}! This is a ${process.env.BOT_NAME}, an echo bot. ${localeText}`;

          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }

      await next();
    });

    this.onMessage(async (context: TurnContext, next) => {
      const replyText = `Echo: ~${context.activity.text}~`;

      await context.sendActivity(MessageFactory.text(replyText, replyText));

      await next();
    });
  }
}
