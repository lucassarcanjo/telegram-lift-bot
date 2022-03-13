export interface ChatUser {
  /** Unique identifier for this user or bot */
  id: number;
  /** True, if this user is a bot */
  is_bot: boolean;
  /** User's or bot's first name */
  first_name: string;
  /** User's or bot's last name */
  last_name?: string;
  /** User's or bot's username */
  username?: string;
}

export interface ChatMessage {
  /** For text messages, the actual UTF-8 text of the message, 0-4096 characters */
  text: string;
  /** Date the message was sent in Unix time */
  date: number;
  /** Sender of the message; empty for messages sent to channels */
  from: ChatUser;
}
