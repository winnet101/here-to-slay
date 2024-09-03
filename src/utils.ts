export function toRemoved<T>(arr: T[], target: T) {
  let newArr = arr.slice();
  newArr.splice(newArr.indexOf(target), 1);
  return newArr;
}