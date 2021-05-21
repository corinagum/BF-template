import { ConversationState, MemoryStorage, UserState } from 'botbuilder-core';
import { BrowserBot } from './BrowserBot';
import WebChatAdapter from './webChatAdapter';

export default function (): WebChatAdapter['botConnection'] {
  const memory = new MemoryStorage();
  const conversationState = new ConversationState(memory);
  const userState = new UserState(memory);
  const webChatAdapter = new WebChatAdapter();

  const browserBot = new BrowserBot(conversationState, userState);

  webChatAdapter.processActivity(async context => {
    await browserBot.run(context);
  });

  return webChatAdapter.botConnection;
}
