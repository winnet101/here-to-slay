import { useEffect, useState } from "react";
import StringInput from "../lib/StringInput";
import { State } from "../types/gameTypes";
import { useHostState } from "../hooks/react-use-peer-state";
import { toRemoved } from "../utils";

export default function Host() {
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>("host");

  const [state, setState, realId, connections] = useHostState<State>(id, {
    kind: "join",
    players: [name],
  });

  useEffect(() => {
    connections.forEach((conn) => {
      conn.on("open", () => {
        if (state.kind !== "join") {
          conn.close();
          return;
        }
        setState({ ...state, players: [...state.players, conn.label] });
      });

      conn.on("close", () => {
        if (state.kind !== "join") return;
        setState({
          ...state,
          players: [name, ...toRemoved(state.players, conn.label)],
        });
      });
    });

    return () => {
      connections.forEach((connection) => {
        connection.off("data");
        connection.off("close");
        connection.off("error");
      });
    };
  }, [connections]);

  return (
    <>
      <h3>HOST</h3>
      <p>Id: {realId ?? "Loading..."}</p>
      <StringInput onSubmit={setId} />
      {connections ? (
        <>
          <code> [{state.kind === "join" && state.players.join(", ")}]</code>{" "}
          <br></br>
        </>
      ) : (
        <p>None are connected</p>
      )}
      <p>
        Current name: {name}{" "}
        <StringInput
          onSubmit={(newName) => {
            if (state.kind !== "join") return;
            setName(newName);
            setState({
              ...state,
              players: toRemoved([...state.players, newName], name),
            });
            // toRemoved([...], name): removes old name
            // [...state.players, newName]: adds new name
          }}
        />
      </p>
      <button
        onClick={() => {
          if (state.kind !== "join") return;
          setState({ kind: "assign", players: state.players.map((p) => ({name: p, partyLeader: ""})) });
        }}
      >
        Start Game
      </button>
    </>
  );
}
