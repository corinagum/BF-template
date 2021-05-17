export type User = {
  id?: string;
  name?: string;
};

//** https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication?view=azure-bot-service-4.0#request */
export type DirectLineTokenRequestBody = {
  user: User;
  trustedOrigins?: string[];
};

/** https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication?view=azure-bot-service-4.0#response */
export interface DirectLineTokenResponseJSON {
  conversationId: string;
  error?: unknown;
  expires_in: number;
  token: string;
}

export interface DirectLineTokenData extends DirectLineTokenResponseJSON {
  expires_at?: number;
  userId?: string;
}

/** https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-api-reference?view=azure-bot-service-4.0#conversation-object */
export type DirectLineConversationObject = {
  conversationId: string;
  eTag: string;
  expires_in: number;
  referenceGrammarId: string;
  streamUrl: string;
  token: string;
};
