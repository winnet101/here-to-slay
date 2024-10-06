import { useEffect, useState } from "react";
import { AssignPlayer, Player, State } from "../types/gameTypes";

export function useCurrPlayer<T extends string | AssignPlayer | Player>(state: State | undefined, name: string): T {
  const [currPlayer, setCurrPlayer]= useState( findCurrPlayer(state, name));


  useEffect(() => {
    setCurrPlayer(findCurrPlayer(state, name));
  }, [state, name]);

  return currPlayer as T;
}

function findCurrPlayer(state: State | undefined, name: string) {
  if (!state) return undefined;
  return state.kind === "join"
    ? state.players.find((p) => p)
    : state.players.find((p) => p.name === name)
}
