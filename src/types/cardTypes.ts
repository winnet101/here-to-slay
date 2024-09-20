type HeroClass =
  | "bard"
  | "wizard"
  | "ranger"
  | "fighter"
  | "guardian"
  | "thief";

interface Action {
  type: string;
  number: number;
  condition?: boolean;
}

interface BaseCard {
  kind: "hero" | "magic" | "item" | "challenge" | "modifier";
}

interface HeroCard extends BaseCard {
  kind: "hero";
  name: string;
  class: HeroClass;
  minroll: number;
  action: Action;
}

interface MagicCard extends BaseCard {
  kind: "magic";
  name: string;
  action: Action;
}

interface ItemCard extends BaseCard {
  kind: "item";
  name: string;
  effect: string;
  equippedHero?: string;
}

interface ChallengeCard extends BaseCard {
  kind: "challenge";
}

interface ModifierCard extends BaseCard {
  kind: "modifier";
  posModifier: 0 | 1 | 2 | 3 | 4;
  negModifier: 0 | 1 | 2 | 3 | 4;
}

interface Monster {
  name: string;
  reqs: { number: number; classes?: HeroClass[] };
  lowRoll: number;
  lowEffect: Action;
  highRoll: number;
  highEffect: Action;
  reward: string;
}

interface Leader {
  name: string, 
  type: HeroClass | HeroClass[],
  effect: string
}

type Card = HeroCard | MagicCard | ItemCard | ChallengeCard | ModifierCard;

export type { HeroClass, Card, Monster, Leader };
