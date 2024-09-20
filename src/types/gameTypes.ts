import { DataConnection } from "peerjs";
import { Card, Monster } from "./cardTypes";

interface AssignPlayer {
  name: string;
  partyLeader: string;
}

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
  players: AssignPlayer[];
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

interface ReactNodeState<T extends State> {
  state: T;
  setState: (state: T) => void;
  name: string;
  changeState: <K extends State>(state: K) => void;
}

export type {
  JoinState,
  AssignState,
  GameState,
  State,
  AssignPlayer,
  Player,
  ReactNodeState,
};
