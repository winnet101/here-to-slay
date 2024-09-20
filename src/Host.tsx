import { useEffect, useState } from "react";
import { useHostState } from "./hooks/react-use-peer-state";
import { State } from "./types/gameTypes";
import Join from "./Join";
import StringInput from "./lib/StringInput";
import Assign from "./Assign";
import { currState, toRemovedArr } from "./lib/utils";

function createId(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newId = "";
  for (let i = 0; i < length; i++) {
    newId += chars.charAt(Math.round(chars.length * Math.random()));
  }
  return newId;
}

export default function Host() {
  const [name, setName] = useState<string>("host");
  const [id, setId] = useState<string>();
  const [state, setState, realId, connections] = useHostState<State>(id, {
    kind: "join",
    players: [name],
  });

  useEffect(() => {
    setId(createId(6));
  }, []);

  useEffect(() => {
    if (state.kind !== "join") return;

    connections.forEach((conn) => {
      conn.on("open", () => {
        // if (state.kind !== "join") {
        //   conn.close();
        //   return;
        // }
        setState({ ...state, players: [...state.players, conn.label] });
      });

      conn.on("close", () => {
        if (state.kind !== "join") return;
        setState({
          ...state,
          players: [name, ...toRemovedArr(state.players, conn.label)],
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

  function changeState<T extends State>(state: T) {
    setState(state);
  }

  return (
    <>
      <p>Id: {realId ?? "Loading..."}</p>
      <StringInput onSubmit={setName}></StringInput>
      {currState({
        state: state,
        setState: setState,
        name: name,
        changeState: changeState,
      })}
    </>
  );
}
