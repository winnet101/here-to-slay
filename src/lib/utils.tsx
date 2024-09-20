import Assign from "../Assign";
import Join from "../Join";
import { AssignState, GameState, JoinState, ReactNodeState, State } from "../types/gameTypes";

export function toRemovedArr<T>(arr: T[], target: T) {
  let newArr = arr.slice();
  newArr.splice(newArr.indexOf(target), 1);
  return newArr;
}

export function toReplacedArr<T>(arr: T[], i: number, newValue: T) {
  let newArr = arr.slice();
  newArr[i] = newValue;
  return newArr;
}

export function currState<T extends State>(props: ReactNodeState<T>) {
  switch (props.state.kind) {
    case "join":
      return (
        <Join
          {...props as unknown as ReactNodeState<JoinState>}
          // literally lmao
        />
      );
    case "assign":
      return (
        <Assign
          {...props as unknown as ReactNodeState<AssignState>}
        />
      );
    case "play":
      return <></>;
  }
}

