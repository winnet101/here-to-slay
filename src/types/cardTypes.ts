interface BaseAction {
  kind: ActionKinds;
  target: Targets;
  number: number;
}

interface MultiTargets {
  from: "any" | "opps";
  number: number;
}

type Targets =  MultiTargets | "self" | "all";

type ActionKinds =
  | "draw"
  | "select"
  | "play"
  | "steal"
  | "destroy"
  | "sacrifice"
  | "discard"
  | "return"
  | "reveal"
  | "pull" // from hand
  | "trigger" // a hero's ability
  | "modify" // +X to all rolls until eot
  | "guard" // cards can't be Xed until next turn
  | "condition";

interface ConditionAction extends BaseAction {
  kind: "condition";
  condition: string;
}

interface GuardAction extends BaseAction {
  kind: "guard";
  guard: "sacrifice" | "steal" | "destroy";
}

interface ModifyAction extends BaseAction {
  kind: "modify";
  modifier: number;
}

interface SelectAction extends BaseAction {
  kind: "select";
  numberToHand: number;
}

type Action =
  | BaseAction
  | GuardAction
  | ModifyAction
  | SelectAction
  | ConditionAction;

type CardKinds =
  | "hero"
  | "magic"
  | "item"
  | "cursed_item"
  | "challenge"
  | "modifier";

type HeroClass =
  | "bard"
  | "wizard"
  | "ranger"
  | "fighter"
  | "guardian"
  | "thief";

interface BaseCard {
  kind: CardKinds;
  name: string;
  desc: string;
}

interface HeroCard extends BaseCard {
  kind: "hero";
  class: HeroClass;
  minroll: number;
  action: Action[];
}

interface MagicCard extends BaseCard {
  kind: "magic";
  action: BaseAction;
}

interface ItemCard extends BaseCard {
  kind: "item" | "cursed_item";
  effect: string;
  equippedHero?: string;
}

interface ChallengeCard extends BaseCard {
  kind: "challenge";
  name: "challenge";
}

interface ModifierCard extends BaseCard {
  kind: "modifier";
  name: "modifier";
  posModifier: 0 | 1 | 2 | 3 | 4;
  negModifier: 0 | 1 | 2 | 3 | 4;
}

interface Monster {
  name: string;
  reqs: { number: number; classes?: HeroClass[] };
  lowRoll: number;
  lowEffect: BaseAction;
  highRoll: number;
  highEffect: BaseAction;
  reward: string;
}

interface Leader {
  name: string;
  type: HeroClass | HeroClass[];
  effect: string;
}

type Card = HeroCard | MagicCard | ItemCard | ChallengeCard | ModifierCard;

export type { HeroClass, Card, Monster, Leader, Action };
