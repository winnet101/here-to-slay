import { useState } from "react";
import { useClientState } from "../hooks/react-use-peer-state";
import { State } from "../types/gameTypes";
import StringInput from "../lib/StringInput";
import { currState } from "../lib/utils";

export default function Client() {
  const [host, setHost] = useState<string>();
  const [name, setName] = useState<string>("");
  const [state, setState, connected] = useClientState<State>(
    host || undefined,
    name
  );

  function changeState<T extends State>(state: T) {
    setState(state);
  }

  return (
    <>
      <p>
        {name ? `Current name: ${name}` : "Choose a name"}{" "}
        <StringInput onSubmit={(name) => setName(name)} />
      </p>

      {connected ? (
        <>
          {currState({
            state: state ?? { kind: "join", players: [] },
            setState: setState,
            name: name,
            changeState: changeState,
          })}
        </>
      ) : (
        <>
          {name && (
            <>
              <p>Input host id:</p>
              <StringInput onSubmit={setHost} />
            </>
          )}
        </>
      )}
    </>
  );
}
