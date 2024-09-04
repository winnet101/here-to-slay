import { useState } from "react";
import Host from "./host/Join";
import Client from "./client/Join";

export default function App() {
  const [isHost, setIsHost] = useState(false);

  return (
    <>
      <input
        type="checkbox"
        checked={isHost}
        onChange={(ev) => {
          setIsHost(ev.target.checked);
        }}
      />
      {isHost ? <Host /> : <Client />}
    </>
  );
}
