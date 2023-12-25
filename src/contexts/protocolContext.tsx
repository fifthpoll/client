import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import voting from "../protocols/voting";
import useWeb5 from "./web5context";
import { ProtocolDefinition } from "../types";

const protocolDefinitions = { voting };

interface ProtocolContextType {
  voting: { definition: ProtocolDefinition };
  fetchUserPublishedEvents: () => Promise<void>;
  userPublishedEvents: Event[];
}

const ProtocolContext = createContext<ProtocolContextType>(
  {} as ProtocolContextType
);

export function ProtocolProvider({ children }: { children: React.ReactNode }) {
  const flag = useRef(false);

  const web5 = useWeb5();

  const [userPublishedEvents, setUserPublishedEvents] = useState<Event[]>([]);

  const voting = {
    definition: protocolDefinitions.voting,
    fetchUserPublishedEvents: async () => {
      setUserPublishedEvents([]);
      const events = await web5.client?.dwn.records.query({
        message: {
          filter: {
            protocol: voting.definition.protocol,
          },
        },
      });

      for (let record of events?.records || []) {
        const rec = await record.data.json();
        setUserPublishedEvents((p) => [...p, rec]);
      }
    },
    userPublishedEvents,
  };

  const value: ProtocolContextType = { voting };

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      web5.configureProtocol(protocolDefinitions.voting);
    }
  }, []);

  return (
    <ProtocolContext.Provider value={value}>
      {children}
    </ProtocolContext.Provider>
  );
}

export default function useProtocol() {
  return useContext(ProtocolContext);
}
