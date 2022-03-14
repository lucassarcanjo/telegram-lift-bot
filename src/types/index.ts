import { Context } from "telegraf";
import { Intent } from "../api/textRecognition";

export interface BotContext extends Context {
  session: {
    monday: boolean | undefined;
    tuesday: boolean | undefined;
    wednesday: boolean | undefined;
    thursday: boolean | undefined;
    friday: boolean | undefined;
  };
}

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export interface ActionResult<T extends Intent> {
  /**
   * Additional message explaining operation result or error
   */
  message?: Maybe<string>;
  /**
   * True is a successful operation. False indicates that operation has errors
   */
  status: boolean;
  /**
   * Operation type based on Intent
   */
  type?: T;
}

export type Maybe<T> = T | null | undefined;
