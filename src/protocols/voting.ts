import { useEffect, useState } from "react";
import useWeb5 from "../contexts/web5context";
import { getObjectKeys, hasContextLoaded } from "../utils";
import useSafeEffect from "../hooks/useSafeEffect";
import { DateSort, Event } from "../types";

const definition = {
  protocol: "https://api.npoint.io/a9e92a866c3bbc2a03d9",
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
        {
          who: "anyone",
          can: "update",
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

      if (!records) throw new Error("unable to fetch records");

      setEvents([]);
      for (let record of records) {
        const rec = await record.data.json();
        setEvents((p) => [...p, { ...rec, id: record.id } as any]);
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
    await record.send(web5.userId);

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

      setEvents([]);
      for (let record of records || []) {
        const rec = await record.data.json();
        setEvents((p) => [...p, { ...rec, id: record.id } as any]);
      }
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [web5.loading, did]);

  return { data: events, isLoading: loading, refetch: loadData } as const;
}

function getCastVoteAction() {
  const web5 = useWeb5();

  async function castVote(
    eventPublishedDid: string,
    recordId: string,
    outcomeId: string
  ) {
    if (!hasContextLoaded(web5)) return;

    const { record } = await web5.client.dwn.records.read({
      from: eventPublishedDid,
      message: { filter: { recordId } },
    });

    const data = (await record.data.json()) as Event;

    let newData = JSON.parse(JSON.stringify(data)) as typeof data;

    getObjectKeys(newData.votes).forEach(
      (key) =>
        (newData.votes[key].votes = data.votes[key].votes.filter(
          (v) => v != web5.userId
        ))
    );

    newData.votes = {
      ...newData.votes,
      [outcomeId]: {
        ...newData.votes[outcomeId],
        votes: [...newData.votes[outcomeId].votes, web5.userId],
      },
    };

    let currWin = { uid: "", votes: 0 };

    getObjectKeys(newData.votes).forEach((key) => {
      if (newData.votes[key].votes.length >= currWin.votes) {
        currWin = {
          uid: key,
          votes: newData.votes[key].votes.length,
        };
      }
    });

    newData.currentWinningOutcome = currWin;

    await record.update({
      data: newData,
    });
  }

  return castVote;
}

export default {
  definition,
  getUserPublishedEvents,
  getPublishEventAction,
  getEventsPublishedByDid,
  getCastVoteAction,
};
