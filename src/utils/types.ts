/******************************************************************************
 * General types that are used through the application. Makes life easier.
 */

export interface Hash<T> {
  [key: string]: T;
}

export type OrUndefined<T> = T | undefined;
export type Args = string[];

export type Command = {
  args: string;
  usage: string;
  func: any;
};

export type CommandsHash = Hash<Command>;
