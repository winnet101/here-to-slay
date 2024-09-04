// npm i @tater-archives/react-use-peer-state

import Peer, { DataConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";

/**
 * useState that syncs with a host peer.
 * @param peerId Host id the client connects to.
 */
function useClientState<T>(
  peerId: string | undefined,
  name: string,
): [T | undefined, (value: T) => void, connected: boolean];
function useClientState<T>(
  peerId: string | undefined,
  name: string,
  initialState: T,
): [T, (value: T) => void, connected: boolean];
function useClientState<T>(
  peerId: string | undefined,
  name: string,
  initialState?: T,
): [T | undefined, (value: T) => void, connected: boolean] {
  const [state, setState] = useState(initialState);
  const [peer, setPeer] = useState<Peer>();
  const [connection, setConnection] = useState<DataConnection>();

  useEffect(() => {
    const newPeer = new Peer();

    setPeer(newPeer);
    return () => {
      newPeer.destroy();
      setPeer(undefined);
      setConnection(undefined);
    };
  }, []);

  useEffect(() => {
    if (peer === undefined || peerId === undefined) return;
    const newConnection = peer.connect(peerId, {label: name});
    setConnection(newConnection);

    return () => {
      newConnection.close();
      setConnection(undefined);
    };
  }, [peer, peerId]);

  useEffect(() => {
    if (connection === undefined) return;
    connection.on("data", (data) => {
      setState(data as T);
    });
    connection.on("close", () => {
      setConnection(undefined);
    });
    connection.on("error", (error) => {
      alert(`An error occurred: ${error.type}`);
    });
  }, [connection]);

  const handleSetState = (value: T) => {
    setState(value);
    connection?.send(value);
  };

  return [state, handleSetState, connection?.open ?? false];
}

/**
 * useState for a Host that syncs with an array of client states.
 * @param id Wrapper for `const [id, setId] = useState<string>()` that is initialized to a random id.
 * @param identifier Specified id.
 *
 */
function useHostState<T>(
  id?: string
): [
  state: T | undefined,
  setState: (value: T) => void,
  identifier: string | undefined,
  connections: DataConnection[]
];
function useHostState<T>(
  id: string | undefined,
  initialState: T
): [
  state: T,
  setState: (value: T) => void,
  identifier: string | undefined,
  connections: DataConnection[]
];
function useHostState<T>(identifier: string | undefined, initialState?: T) {
  const [id, setId] = useState<string>();
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const [_, setPeer] = useState<Peer>();
  const [connections, setConnections] = useState<DataConnection[]>([]);

  useEffect(() => {
    const newPeer = identifier ? new Peer(identifier) : new Peer();
    newPeer.on("open", () => setId(newPeer.id!));

    newPeer.on("connection", (newConnection) => {
      setConnections((connections) => [...connections, newConnection]);
      newConnection.on("open", () => {
        newConnection.send(stateRef.current);
      });

    });

    setPeer(newPeer);

    return () => {
      newPeer.destroy();
      setPeer(undefined);
      setId(undefined);
      setConnections([]);
    };
  }, [identifier]);

  useEffect(() => {
    connections.forEach((connection) => {
      connection.on("data", (data) => {
        setState(data as T);
        connections
          .filter((e) => e !== connection)
          .map((otherConnection) => {
            otherConnection.send(data);
          });
      });

      connection.on("close", () => {
        setConnections(connections.filter((e) => e !== connection));
      });

      connection.on("error", (error) => {
        alert(`An error occurred: ${error.type}`);
        console.error("PeerJS Connection error:\n" + error);
      });
    });

    return () => {
      connections.forEach((connection) => {
        connection.off("data");
        connection.off("close");
        connection.off("error");
      });
    };
  }, [connections]);

  const handleSetState = (value: T) => {
    setState(value);
    connections.forEach((conn) => {
      if (conn.open) {
        conn.send(value);
      } else {
        conn.on("open", () => {
          conn.send(value);
        });
      }
    });
  };

  return [state, handleSetState, id, connections];
}

export { useClientState, useHostState };
