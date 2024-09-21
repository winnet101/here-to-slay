import { State } from "./types/gameTypes";
import StringInput from "./lib/StringInput";
import { currState } from "./lib/utils";
import { useHostSynced } from "./hooks/useHostSynced";

function createId(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newId = "";
  for (let i = 0; i < length; i++) {
    newId += chars.charAt(Math.round(chars.length * Math.random()));
  }
  return newId;
}

export default function Host() {
  const { state, setState, name, setName, realId, setId } = useHostSynced(
    "host",
    createId(6)
  );

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
