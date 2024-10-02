import { Card, Monster } from "./cardTypes";

interface AssignPlayer {
  name: string;
  partyLeader: string;
  ready?: boolean;
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

class PlayerClass {
  name: string;
  partyLeader: string;
  hand: Card[];
  field: Card[];
  slainMonsters: Monster[] = [];
  actionPts: number = 3;
  maxActionPts: number = 3;

  constructor(name:string, partyLeader: string) {
    this.name = name;
    this.partyLeader = partyLeader;
    this.hand = [];
    this.field = [];
  }
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

interface PlayState extends BaseState {
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

interface ModifierState extends PlayState {
  phase: "modifier";
  currRoll: number;
}

interface ChallengeState extends PlayState {
  phase: "challenge";
}

type State =
  | JoinState
  | AssignState
  | PlayState
  | ModifierState
  | ChallengeState;

interface ReactNodeState<T extends State, P extends string | AssignPlayer | Player> {
  state: T;
  setState: (state: T) => void;
  currPlayer: P;
  changeState: <K extends State>(state: K) => void;
}

export type {
  JoinState,
  AssignState,
  PlayState,
  State,
  AssignPlayer,
  Player,
  ReactNodeState,
};

export {PlayerClass}
