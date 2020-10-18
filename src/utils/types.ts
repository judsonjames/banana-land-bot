/******************************************************************************
 * General types that are used through the application. Makes life easier.
 */

import { Client, Message } from 'discord.js';

export interface Hash<T> {
  [key: string]: T;
}

export type OrUndefined<T> = T | undefined;
export type OrNull<T> = T | null;
export type Args = string[];

export type Command = {
  args: string;
  usage: string;
  func: any;
};

export type CommandProps = {
  msg: Message;
  args: Args;
  bot: Client;
};

export type CommandsHash = Hash<Command>;
