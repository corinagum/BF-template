import { ActivityHandler, ActivityTypes, MessageFactory, TurnContext } from 'botbuilder';

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
          const welcomeText = `Welcome, ${member.name}! This is ${process.env.BOT_NAME}, an echo bot. ${localeText}`;

          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }

      await next();
    });

    this.onMessage(async (context: TurnContext, next) => {
      const {
        activity: { type, text = ' ' }
      } = context;

      if (type === ActivityTypes.Message) {
        const replyText = `Echo: ~${text}~`;

        await context.sendActivity(MessageFactory.text(replyText, replyText));
      } else {
        const nonMessageTypeReply = `${type} event detected`;
        await context.sendActivity(MessageFactory.text(nonMessageTypeReply, nonMessageTypeReply));
      }

      await next();
    });
  }
}
