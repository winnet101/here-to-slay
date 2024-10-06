import { Action } from "../types/cardTypes";
import { PlayState } from "../types/gameTypes";

export const drawCards = (
  num: number,
  state: PlayState,
  setState: (state: PlayState) => void,
  name: string
) => {
  const newCards = state.deck.slice(0, num);
  console.log(newCards);
  const currPlayer = state.players.find((p) => p.name === name)!;
  // const p = currPlayer

  setState({
    ...state,
    deck: state.deck.slice(num),
    players: state.players.with(
      state.players.map((p) => p.name).indexOf(name),
      {
        ...currPlayer,
        hand: [...currPlayer.hand, ...newCards],
      }
    ),
  });
};

export const parseAction = (
  action: Action[],
  state: PlayState,
  setState: (state: PlayState) => void,
  playerNames: string[]
) => {
  action.forEach((a) => {
    switch (a.kind) {
      case "draw":
        playerNames.forEach(name => {
          drawCards(a.number, state, setState, name);
        });
        break;
      case "select":
      case "play":
      case "steal":
      case "destroy":
      case "sacrifice":
      case "discard":
      case "return":
      case "reveal":
      case "pull":
      case "trigger":
      case "modify":
      case "guard":
      case "condition":
    }
  });
};
