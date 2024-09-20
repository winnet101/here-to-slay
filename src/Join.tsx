import { useEffect, useState } from "react";
import { JoinState, ReactNodeState, State } from "./types/gameTypes";
import { toRemovedArr } from "./lib/utils";

export default function Join({
  state,
  setState,
  name,
  changeState,
}: ReactNodeState<JoinState>) {
  // const [state, setState, realId, connections] = useHostState<State>(id, {
  //   kind: "join",
  //   players: [name],
  // });

  return (
    <>
      <p>
        <code> [{state.kind === "join" && state.players.join(", ")}]</code>{" "}
        <br></br>
      </p>
      <button
        onClick={() => {
          changeState({
            kind: "assign",
            players: state.players.map((p) => ({
              name: p,
              partyLeader: "",
            })),
          });
        }}
      >
        Start Game
      </button>
    </>
  );
}
