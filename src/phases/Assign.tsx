import { Fragment, ReactNode, useEffect } from "react";
import {
  AssignPlayer,
  AssignState,
  Player,
  PlayerClass,
  ReactNodeState,
} from "../types/gameTypes";
import { partyLeaders } from "../data/cards";
import { toReplacedArr } from "../lib/utils";

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
      <button
        onClick={() => {
          const newPlayers = players.map((p) => new PlayerClass(p.name, p.partyLeader))

          changeState({
            ...state,
            kind: "play",
            players: newPlayers,
            activePlayer: newPlayers[0],
            phase: "start",
            deck: [],
            discard: [],
            monsterDeck: [],
            monsterField: [],
            stack: [],
            winner: null,
          });
        }}
      >
        Start Game
      </button>

      <style>
        {`.selected {
          background-color: aqua; 
        }`}
      </style>
    </>
  );
}
