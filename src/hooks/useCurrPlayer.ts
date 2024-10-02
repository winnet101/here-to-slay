import { useEffect, useRef, useState } from "react";
import { AssignPlayer, Player, State } from "../types/gameTypes";

export function useCurrPlayer(state: State | undefined, name: string): string | AssignPlayer | Player | undefined {
  const [currPlayer, setCurrPlayer]= useState( findCurrPlayer(state, name));


  useEffect(() => {
    setCurrPlayer(findCurrPlayer(state, name));
  }, [state, name]);

  return currPlayer;
}

function findCurrPlayer(state: State | undefined, name: string) {
  if (!state) return undefined;
  return state.kind === "join"
    ? state.players.find((p) => p)
    : state.players.find((p) => p.name === name)
}
