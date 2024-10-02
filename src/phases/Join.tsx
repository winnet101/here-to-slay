import { JoinState, ReactNodeState } from "../types/gameTypes";

export default function Join({
  state, // @ts-expect-error
  setState, // @ts-expect-error
  currPlayer,
  changeState,
}: ReactNodeState<JoinState, string>) {
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
          console.log(
            state.players.map((p) => ({
              name: p,
              partyLeader: "",
            }))
          );
        }}
      >
        Start Game
      </button>
    </>
  );
}
