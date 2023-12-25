import { Web5 } from "@web5/api";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProtocolDefinition, DateSort } from "../types";

interface Web5ContextType {
  client: Web5 | undefined;
  userId: string | undefined;
  loading: boolean;
  configureProtocol(protocolDefinition: ProtocolDefinition): Promise<void>;
}

const Web3Context = createContext<Web5ContextType>({} as Web5ContextType);

export function Web5Provider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Web5>();
  const [userId, setUserId] = useState<string>();

  const flag = useRef<boolean>(false);

  async function setup() {
    const { web5, did: userId } = await Web5.connect();
    if (!web5 || !userId) throw new Error("Web5 connection failed");
    setClient(web5);
    setUserId(userId);
    setLoading(false);
  }

  async function configureProtocol(protocolDefinition: ProtocolDefinition) {
    if (!client || !userId) return;

    const { protocols, status } = await client.dwn.protocols.query({
      message: {
        filter: {
          protocol: protocolDefinition.protocol,
        },
      },
    });

    if (status.code !== 200) {
      alert("Error querying protocols");
      return;
    }
    if (protocols.length > 0) {
      return;
    }

    const { status: configureStatus, protocol } =
      await client.dwn.protocols.configure({
        message: {
          definition: protocolDefinition,
        },
      });

    protocol?.send(userId);
  }

  useEffect(() => {
    if (flag.current) return;
    setup();
    flag.current = true;
  }, []);

  const value: Web5ContextType = { client, userId, loading, configureProtocol };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb5() {
  return useContext(Web3Context);
}
