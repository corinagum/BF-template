/**
 * ConnectionStatus enum is lifted directly from the Bot Framework DirectLineJS repo:
 * https://github.com/microsoft/BotFramework-DirectLineJS/blob/master/src/directLine.ts#L354
 * in favor of reducing dependencies
 */
export enum ConnectionStatus {
  Uninitialized, // The status when the Direct Line object is first created/constructed
  Connecting, // Currently trying to connect to the conversation
  Online, // Successfully connected to the conversation; connection is healthy as far as we know
  ExpiredToken, // The last operation errored out with an expired token. Possibly waiting for someone to supply a new one
  FailedToConnect, // The initial attempt to connect to the conversation failed; no recovery possible
  Ended // The bot ended the conversation
}
