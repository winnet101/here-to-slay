import { Fragment, ReactNode, useEffect } from "react";
import { AssignPlayer, AssignState, ReactNodeState } from "./types/gameTypes";
import { partyLeaders } from "./data/cards";
import { toReplacedArr } from "./lib/utils";

export default function Assign({
  state,
  setState,
  name,
  changeState,
}: ReactNodeState<AssignState>) {
  const players = state.players.slice();

  function handleClick(leaderName: string) {
    const index = players.map((p) => p.name).indexOf(name);
    const targetPlayer = players[index];

    if (
      players
        .filter((p) => p.name !== name)
        .map((p) => p.partyLeader)
        .includes(leaderName)
    )
      return;

    if (targetPlayer.partyLeader !== leaderName) {
      console.log(leaderName);
      const targetEdited = {
        ...targetPlayer,
        partyLeader: leaderName,
      };
      setState({
        ...state,
        players: players.with(index, targetEdited),
      });
    } else {
      const targetEdited: AssignPlayer = {
        ...targetPlayer,
        partyLeader: "",
      };
      setState({
        ...state,
        players: toReplacedArr(players, index, targetEdited),
      });
    }
  }

  return (
    <>
      <p>
        Current leader:{" "}
        {
          state.players[state.players.map((p) => p.name).indexOf(name)]
            .partyLeader
        }
      </p>
      {partyLeaders.map((lead, i) => {
        const selectedPlayer = players.filter(
          (p) => p.partyLeader === lead.name
        )[0]?.name;

        return (
          <Fragment key={i}>
            <button
              onClick={() => {
                handleClick(lead.name);
              }}
              className={`${selectedPlayer && "selected"}`}
            >
              {lead.name}
            </button>
            {selectedPlayer}
          </Fragment>
        );
      })}

      <style>
        {`.selected {
          background-color: aqua; 
        }`}
      </style>
    </>
  );
}
