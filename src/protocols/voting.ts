import { useState } from "react";
import useWeb5 from "../contexts/web5context";
import { hasContextLoaded } from "../utils";
import useSafeEffect from "../hooks/useSafeEffect";
import { DateSort, Event } from "../types";

const definition = {
  protocol: "https://protocols.marsian.dev/voting",
  published: true,
  types: {
    event: {
      schema: "https://protocols.marsian.dev/voting/metadata.json",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    event: {
      $actions: [
        {
          who: "anyone",
          can: "read",
        },
        {
          who: "anyone",
          can: "write",
        },
      ],
    },
  },
};

function getUserPublishedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const web5 = useWeb5();

  async function loadData() {
    if (!hasContextLoaded(web5)) return;
    setLoading(true);

    try {
      const { records } = await web5.client.dwn.records.query({
        from: web5.userId,
        message: {
          filter: {
            protocol: definition.protocol,
          },
        },
      });

      for (let record of records || []) {
        const rec = await record.data.json();
        setEvents((p) => [...p, rec]);
      }
    } finally {
      setLoading(false);
    }
  }

  useSafeEffect(
    () => {
      loadData();
    },
    [web5.loading],
    () => hasContextLoaded(web5)
  );

  return { data: events, isLoading: loading, refetch: loadData } as const;
}

function getPublishEventAction() {
  const web5 = useWeb5();

  async function publish(event: Event, callack?: (data: any) => void) {
    if (!hasContextLoaded(web5)) return;

    const { record } = await web5.client.dwn.records.create({
      data: {
        "@type": "event",
        ...event,
      },
      store: false,
      message: {
        protocol: definition.protocol,
        protocolPath: "event",
        schema: definition.types.event.schema,
        published: true,
      },
    });

    if (!record) throw new Error("Failed record");
    record.send(web5.userId);

    const data = await record.data.json();
    callack && callack(data);
  }

  return publish;
}

function getEventsPublishedByDid(did: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const web5 = useWeb5();

  async function loadData() {
    if (!hasContextLoaded(web5)) return;
    setLoading(true);

    try {
      const { records } = await web5.client.dwn.records.query({
        from: did,
        message: {
          filter: {
            schema: definition.types.event.schema,
            protocol: definition.protocol,
            protocolPath: "event",
          },
          dateSort: DateSort.CreatedAscending,
        },
      });

      for (let record of records || []) {
        const rec = await record.data.json();
        setEvents((p) => [...p, rec]);
      }
    } finally {
      setLoading(false);
    }
  }

  useSafeEffect(
    () => {
      loadData();
    },
    [web5.loading],
    () => hasContextLoaded(web5)
  );

  return { data: events, isLoading: loading, refetch: loadData } as const;
}

export default {
  definition,
  getUserPublishedEvents,
  getPublishEventAction,
  getEventsPublishedByDid,
};
