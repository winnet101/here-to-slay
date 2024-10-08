import { Fragment } from "react";
import {
  AssignPlayer,
  AssignState,
  Player,
  ReactNodeState,
} from "../types/gameTypes";
import { heroCatalog, partyLeaders } from "../data/cards";
import { toReplacedArr } from "../lib/utils";
import { useCurrPlayer } from "../hooks/useCurrPlayer";

export default function Assign({
  state,
  setState,
  name,
  changeState,
}: ReactNodeState<AssignState>) {

  const currPlayer = useCurrPlayer<AssignPlayer>(state, name);
  const players = state.players.slice();
  const index = players.map((p) => p.name).indexOf(name);

  function handleClick(leaderName: string, index: number) {
    console.log(players.map((p) => p.name));
    if (
      players
        .filter((p) => p.name !== name)
        .map((p) => p.partyLeader)
        .includes(leaderName)
    )
      return;

    if (currPlayer.partyLeader !== leaderName) {
      console.log(leaderName);
      const targetEdited = {
        ...currPlayer,
        partyLeader: leaderName,
      };
      setState({
        ...state,
        players: players.with(index, targetEdited),
      });
    } else {
      const targetEdited: AssignPlayer = {
        ...currPlayer,
        partyLeader: "",
      };
      setState({
        ...state,
        players: toReplacedArr(players, index, targetEdited),
      });
    }
  }

  function beginPlay() {
    const newPlayers:Player[] = state.players.map((p) => ({
      ...p,
      hand: [],
      field: [],
      slainMonsters: [],
      actionPts: 3,
      maxActionPts: 3,
    }))
    
    changeState({
      ...state,
      kind: "play",
      players: newPlayers,
      activePlayerName: newPlayers[0].name, // please be a pointer i beg of you
      phase: "start",
      deck: [...heroCatalog],
      discard: [],
      monsterDeck: [],
      monsterField: [],
      stack: [],
      winner: null,
    });
  }

  return (
    <>
      <p>
        Current leader:{" "}
        {state.players.find((currPlayer) => currPlayer)?.partyLeader}
      </p>
      {partyLeaders.map((lead, i) => {
        const selectedPlayer = players.filter(
          (p) => p.partyLeader === lead.name
        )[0]?.name;

        return (
          <Fragment key={i}>
            <button
              onClick={() => {
                handleClick(lead.name, index);
              }}
              className={`${selectedPlayer && "selected"}`}
            >
              {lead.name}
            </button>
            {selectedPlayer}
          </Fragment>
        );
      })}

      <br />
      <br />
      <p>{state.players.map(p => p.ready).filter(p => p).length} ready</p><button
        onClick={() => {
          const newState = {
            ...state,
            players: players.with(index, {
              ...currPlayer,
              ready: !currPlayer.ready,
            }),
          };

          setState(newState);

          if (
            newState.players
              .map((p) => p.ready)
              .every((ready) => ready === true)
          ) {
            beginPlay();
          }
        }}
      >
        Ready
      </button>

      <style>
        {`.selected {
          background-color: aqua; 
        }`}
      </style>
    </>
  );
}
