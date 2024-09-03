import { KeyboardEvent, useState } from "react";

export default function StringInput({
  onSubmit,
  clearOnSubmit = true,
  enterSubmit = true,
}: {
  onSubmit: (value: string) => void;
  clearOnSubmit?: boolean;
  enterSubmit?: boolean;
}) {
  const [value, setValue] = useState("");

  function handleKeyDown(ev: KeyboardEvent<HTMLInputElement>) {
    switch (ev.key) {
      case "Enter":
        if (enterSubmit === true) {
          ev.preventDefault();
          handleSubmit();
        }
    }
  }

  function handleSubmit() {
    if (clearOnSubmit) setValue("");
    onSubmit(value);
  }

  return (
    <>
      <input
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
        onKeyDown={handleKeyDown}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
