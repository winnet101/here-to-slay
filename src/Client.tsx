import { useState } from "react";
import StringInput from "./lib/StringInput";
import { State } from "./types/gameTypes";
import { useClientState } from "./react-use-peer-state";

export default function Client() {
  const [host, setHost] = useState<string>();
  const [name, setName] = useState<string>("");
  const [state, setState, connected] = useClientState<State>(
    host || undefined,
    name
  );

  return (
    <>
      <h3>CLIENT</h3>
      <p>
        {name ? `Current name: ${name}` : "Choose a name"}{" "}
        <StringInput
          onSubmit={(name) => {
            name.trim() && setName(name.trim());
          }}
        />
      </p>

      {connected ? (
        <>
          <p>Connected</p>
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
