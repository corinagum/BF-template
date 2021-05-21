import {
  Activity,
  BotAdapter,
  ChannelAccount,
  ConversationAccount,
  ConversationReference,
  ResourceResponse,
  TurnContext
} from 'botbuilder-core';
import { ConnectionStatus } from './DirectLineJSTypes';
import Observable from 'core-js/features/observable';
import sequentialTimestamps from './utils/sequentialTimestamps';

const BOT_INFO = { id: '123', name: 'bot', role: 'bot' };
const USER_INFO = { id: '456', role: 'user' };
/**
 * Custom BotAdapter used for deploying a bot in the browser:
 * https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/javascript_es6/01.browser-echo/src/webChatAdapter.ts
 * This creates an imitation Direct Line response to reduce latency by removing the need for calls to the Direct Line service
 */
export default class WebChatAdapter extends BotAdapter {
  activityObserver: Observable;
  botConnection: {
    connectionStatus$: Observable;
    activity$: Observable;
    end(): void;
    getSessionId: () => Observable<string>;
    postActivity: (activity: Activity) => Observable;
  };
  logic: (revocableContext: TurnContext) => Promise<void>;

  constructor() {
    super();

    // botConnection is the equivalent of the DLJS object
    this.botConnection = {
      connectionStatus$: new Observable(observer => {
        observer.next(ConnectionStatus.Uninitialized);
        observer.next(ConnectionStatus.Connecting);
        observer.next(ConnectionStatus.Online);
      }),
      activity$: new Observable(observer => {
        this.activityObserver = observer;
      }),
      end() {},
      getSessionId: () => new Observable(observer => observer.complete()),
      postActivity: (activity: Activity) => {
        const uniqueDateNow = sequentialTimestamps();
        const directLineActivity = {
          ...activity,
          conversation: { id: 'browser' } as ConversationAccount,
          channelId: 'WebChatAdapter',
          id: `dl-${uniqueDateNow}`,
          recipient: BOT_INFO,
          timestamp: new Date(uniqueDateNow)
        };

        return new Observable(observer => {
          this.onReceive(directLineActivity).then(() => {
            observer.next();
            observer.complete();

            this.activityObserver.next(directLineActivity);
          });
        });
      }
    };
  }

  async continueConversation(
    _reference: Partial<ConversationReference>,
    _logic: (revocableContext: TurnContext) => Promise<void>
  ): Promise<void> {}

  deleteActivity(_context: TurnContext, _reference: Partial<ConversationReference>): Promise<void> {
    throw new Error(
      '"deleteActivity" method not implemented; it is not needed for mock Direct Line use in the browser.'
    );
  }

  /**
   * Run bot middleware
   * @param _activity
   */
  async onReceive(_activity: Partial<Activity>): Promise<void> {}

  async processActivity(logic: (revocableContext: TurnContext) => Promise<void>): Promise<WebChatAdapter> {
    this.logic = logic;

    return this;
  }

  /**
   * Mock the ActivitySet sent from the bot
   * @param _context
   * @param activities
   * @returns ActivitySet
   */
  async sendActivities(_context: TurnContext, activities: Partial<Activity>[]): Promise<ResourceResponse[]> {
    const activityData: Partial<Activity> = {
      channelId: 'WebChatAdapter',
      conversation: { id: 'browser' } as ConversationAccount,
      from: BOT_INFO,
      recipient: USER_INFO as ChannelAccount
    };

    const activitySet: Partial<Activity>[] = activities.map(activity => {
      const uniqueDateNow = sequentialTimestamps();

      return {
        ...activity,
        ...activityData,
        id: `id-${uniqueDateNow}`,
        timestamp: new Date(uniqueDateNow)
      };
    });

    return activitySet.map(activity => {
      const { id } = activity;

      this.activityObserver.next(activity);
      return { id };
    });
  }

  updateActivity(_context: TurnContext, _activity: Partial<Activity>): Promise<void | ResourceResponse> {
    throw new Error(
      '"updateActivity" method not implemented; it is not needed for mock Direct Line use in the browser.'
    );
  }
}
