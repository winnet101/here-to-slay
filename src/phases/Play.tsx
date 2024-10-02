import { useCallback } from "react";
import { ReactNodeState, PlayState, Player } from "../types/gameTypes";
import { mapObject } from "../lib/utils";

export default function Play({
  state,
  setState,
  currPlayer,
}: ReactNodeState<PlayState, Player>) {
  const drawCards = useCallback(
    (num: number) => {
      const newCards = state.deck.slice(0, num);
      console.log(newCards);
      const p = state.players.find(p => p.name === currPlayer.name)!

      setState({
        ...state,
        deck: state.deck.slice(num),
        players: state.players.with(
          state.players.map((p) => p.name).indexOf(currPlayer.name),
          {
            ...p,
            hand: [...p.hand, ...newCards]
          }
        ),
      });
    },
    [state]
  );

  return (
    <>
      <div>
        <code>[{state.players.map((p) => p.name).join(", ")}]</code>
      </div>
      <div>Deck: {state.deck.map((c) => c.name)}</div>
      <button
        onClick={() => {
          drawCards(1);
        }}
      >
        Draw Card
      </button>
      <div>
        {/* ACTUAL: {mapObject(state.activePlayer)}
        <br></br>
        CURRPLAYER: {mapObject(currPlayer)} */}
      </div>
    </>
  );
}
