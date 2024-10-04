import { State } from "./types/gameTypes";
import StringInput from "./lib/StringInput";
import { currState, mapObject } from "./lib/utils";
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
  const { state, setState, setName, currPlayer, realId } = useHostSynced(
    "host",
    createId(6) + "-h2slay"
  );

  function changeState<T extends State>(state: T) {
    setState(state);
  }

  return (
    <>
      <p>Id: {realId?.slice(0, realId.indexOf("-")) ?? "Loading..."}</p>
      <StringInput onSubmit={setName}></StringInput>
      <code>
        {mapObject(typeof currPlayer === "object" ? currPlayer : {})};
      </code>
      {currState({
        state: state,
        setState: setState,
        currPlayer: currPlayer!,
        changeState: changeState,
      })}
    </>
  );
}
