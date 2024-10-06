import { useCallback } from "react";
import { ReactNodeState, PlayState } from "../types/gameTypes";
import CardComponent from "../CardComponent";
import { Action } from "../types/cardTypes";
import { drawCards } from "./actions";

export default function Play({
  state,
  setState,
  name,
}: ReactNodeState<PlayState>) {
  const currPlayer = state.players.find((p) => p.name === name)!;

  return (
    <>
      <div>
        <code>[{state.players.map((p) => p.name).join(", ")}]</code>
      </div>
      <div style={{display:"flex", overflowX:"auto"}}>
        {state.players
          .find((p) => p.name == currPlayer.name)
          ?.hand.map((c) => (
            <CardComponent card={c} state={state} setState={setState}
            playerNames={state.players.map(p => p.name)}></CardComponent>
          ))}
      </div>
      <div>Deck: {state.deck.length}</div>
      <button
        onClick={() => {
          drawCards(1, state, setState, name);
        }}
      >
        Draw Card
      </button>
    </>
  );
}
