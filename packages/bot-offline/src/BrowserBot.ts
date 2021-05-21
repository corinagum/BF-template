import {
  ActivityHandler,
  ActivityTypes,
  ConversationState,
  MessageFactory,
  TurnContext,
  UserState
} from 'botbuilder-core';

export class BrowserBot extends ActivityHandler {
  /**
   * BotState: https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-state?view=azure-bot-service-4.0
   */
  conversationState;
  userState;

  constructor(conversationState: ConversationState, userState: UserState) {
    super();

    this.conversationState = conversationState;
    this.userState = userState;
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
