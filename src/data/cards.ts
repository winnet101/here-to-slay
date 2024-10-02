import { Card, Leader } from "../types/cardTypes";

export const partyLeaders: Leader[] = [
  {
    name: "The Charismatic Song",
    type: "bard",
    effect: "",
  },
  {
    name: "The Cloaked Sage",
    type: "wizard",
    effect: "",
  },
  {
    name: "The Divine Arrow",
    type: "ranger",
    effect: "",
  },
  {
    name: "The Fist of Reason",
    type: "fighter",
    effect: "",
  },
  {
    name: "The Protecting Horn",
    type: "guardian",
    effect: "",
  },
  {
    name: "The Shadow Claw",
    type: "thief",
    effect: "",
  },
];

export const heroCatalog: Card[] = [
  {
    kind: "hero",
    name: "Bad Axe",
    class: "fighter",
    minroll: 8,
    action: [
      {
        kind: "destroy",
        target: {
          from: "any",
          number: 1,
        },
        number: 0,
      },
    ],
    desc: "DESTROY a Hero card.",
  },
  {
    kind: "hero",
    name: "Fuzzy Cheeks",
    class: "bard",
    minroll: 8,
    action: [
      {
        kind: "draw",
        target: "self",
        number: 1
      },
      {
        kind: "condition",
        target: "self",
        number: 1,
        condition: "is hero"
      },
      {
        kind: "play",
        target: "self", 
        number: 1
      },
    ],
    desc: "DRAW a card and play a Hero card from your hand immediately."
  },
  {
    kind: "hero",
    name: "Calming Voice",
    class: "guardian",
    minroll: 9,
    action: [
      {
        kind: "guard",
        target: "self",
        number: 1,
        guard: "steal"
      }
    ],
    desc: "Hero cards in your Party cannot be stolen until your next turn."
  },
  {
    kind: "hero",
    name: "Bullseye",
    class: "ranger",
    minroll: 7,
    desc: "Look at the top 3 cards of the deck. Add one to your hand, then return the other two to the top of the deck in any order.",
    action: [{
      kind: "select",
      number: 3,
      target: "self",
      numberToHand: 1
    }]
  }, {
    kind: "hero",
    name: "Kit Napper",
    class: "thief",
    minroll: 9,
    desc: "STEAL a Hero Card.",
    action: [{
      kind: "steal",
      target: {
        from: "opps",
        number: 1
      },
      number: 1
    }]
  },
  {
    kind: "hero",
    name: "Fluffy",
    class: "wizard",
    minroll: 10,
    desc: "DESTROY 2 Hero cards.",
    action:[{
      kind: "destroy",
      target: {from: "any", number: 1},
      number: 2
    }]
  }
];
// uh