import { writable } from "svelte/store";

export enum Level {
  OK,
  WARN,
  ERROR,
}

export enum Mode {
  ACTIVE,
  DISABLED,
  MANUAL,
}

export enum ConnectionStatus {
  DISCONNECTED,
  CONNECTED,
  ERROR,
}

export const connectionStatus = writable(ConnectionStatus.DISCONNECTED);
export const warning_count = writable(undefined);
export const error_count = writable(undefined);
export const current_mode = writable(Mode.DISABLED);
export const global_status_level = writable(Level.WARN);
export const global_status_message = writable("");
