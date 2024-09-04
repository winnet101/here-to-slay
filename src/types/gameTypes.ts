import { Card, Monster } from "./cardTypes";

interface Player {
  name: string;
  partyLeader: string;
  hand: Card[];
  field: Card[];
  slainMonsters: Monster[];
  actionPts: number;
  maxActionPts: number;
}

interface BaseState {
  kind: "join" | "assign" | "play";
}

interface JoinState extends BaseState {
  kind: "join";
  players: string[];
}

interface AssignState extends BaseState {
  kind: "assign";
  players: { name: string; partyLeader: string }[];
}

interface GameState extends BaseState {
  kind: "play";
  players: Player[];
  activePlayer: Player;
  phase: "start" | "action" | "challenge" | "modifier" | "resolution" | "end";
  deck: Card[];
  discard: Card[];
  monsterDeck: Monster[];
  monsterField: Monster[];
  stack: Card[];
  winner: Player | null;
}

interface ModifierState extends GameState {
  phase: "modifier";
  currRoll: number;
}

interface ChallengeState extends GameState {
  phase: "challenge";
}

type State =
  | JoinState
  | AssignState
  | GameState
  | ModifierState
  | ChallengeState;

export type { JoinState, GameState, State, Player };