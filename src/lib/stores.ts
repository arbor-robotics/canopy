import { writable, type Writable } from "svelte/store";

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

export enum BehaviorState {
  PAUSED = 0,
  DRIVING = 1,
  PLANTING = 2,
}

export const node: Writable<any> = writable(undefined);
export const connection_status = writable(ConnectionStatus.DISCONNECTED);
export const current_behavior_state = writable(BehaviorState.PAUSED);
export const warning_count = writable(undefined);
export const error_count = writable(undefined);
export const current_mode = writable(Mode.DISABLED);
export const global_status_level = writable(Level.WARN);
export const global_status_message = writable("");
export const plan_progress = writable(0);
export const planting_eta = writable(0);
export const num_planted_seedlings = writable(0);
export const num_seedlings_in_plan = writable(0);
