import Assign from "../phases/Assign";
import Join from "../phases/Join";
import {
  AssignPlayer,
  AssignState,
  JoinState,
  Player,
  PlayState,
  ReactNodeState,
  State,
} from "../types/gameTypes";
import Play from "../phases/Play";

export function toRemovedArr<T>(arr: T[], target: T) {
  let newArr = arr.slice();
  newArr.splice(newArr.indexOf(target), 1);
  return newArr;
}

/** Fallback for `array.with(index, value).` */
export function toReplacedArr<T>(arr: T[], i: number, newValue: T) {
  let newArr = arr.slice();
  newArr[i] = newValue;
  return newArr;
}

export function currState<
  T extends State,
  P extends string | AssignPlayer | Player,
>(props: ReactNodeState<T, P>) {
  switch (props.state.kind) {
    case "join":
      return (
        <Join
          {...(props as unknown as ReactNodeState<JoinState, string>)}
          // literally lmao
        />
      );
    case "assign":
      return (
        <Assign
          {...(props as unknown as ReactNodeState<AssignState, AssignPlayer>)}
        />
      );
    case "play":
      return (
        <Play {...(props as unknown as ReactNodeState<PlayState, Player>)} />
      );
  }
}

export function shuffleArr<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[j];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

export function returnShuffledArr<T>(arr: T[]) {
  let newArr = arr.slice();
  shuffleArr(newArr);
  return newArr;
}

export function mapObject<T extends object>(obj: T, unwrap: boolean = false) {
  return (
    typeof obj === "object" &&
    Object.entries(obj).map(([key, value], i) => (
      <div key={i}>
        {key}:{" "}
        {value
          ? typeof value === "object"
            ? Array.isArray(value)
              ? value.map((v) => mapObject(v))
              : unwrap
                ? mapObject(value)
                : "[Object]"
            : value
          : ""}
      </div>
    ))
  );
}
