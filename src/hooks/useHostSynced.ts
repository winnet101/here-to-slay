import { useEffect, useRef, useState } from "react";
import { State } from "../types/gameTypes";
import { useHostState } from "./react-use-peer-state";
import { toRemovedArr } from "../lib/utils";

export function useHostSynced(initName: string, initId?: string) {
  const [name, setName] = useState(initName);
  const [id, _setId] = useState<string | undefined>(initId ?? undefined);

  const [state, setState, realId, connections] = useHostState<State>(id, {
    kind: "join",
    players: [name],
  });

  // const currPlayer = useCurrPlayer(state, name);

  // const nameRef = useRef(name);
  // nameRef.current = name;


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

  // useEffect(() => {
  //   if (state.kind !== "join") return;

  //   setState({
  //     ...state,
  //     players: state.players.with(state.players.indexOf(nameRef.current), name),
  //   });
  // }, [name]);

  return { state, setState, setName, name, realId };
}

