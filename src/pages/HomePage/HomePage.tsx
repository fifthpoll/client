import { useEffect, useRef, useState } from "react";
import useWeb5 from "../../contexts/web5context";
import { hasContextLoaded } from "../../utils";
import DataForm from "../../common/DataForm";
import { DateSort, Event, VotingType } from "../../types";

const protocolDefinition = {
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

export default function HomePage() {
  const web5 = useWeb5();

  const flag = useRef(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [pub, setPub] = useState<Event[]>([]);

  async function loadData() {
    if (hasContextLoaded(web5)) {
      const { records: events } = await web5.client.dwn.records.query({
        message: {
          filter: {
            schema: protocolDefinition.types.event.schema,
          },
          dateSort: DateSort.CreatedAscending,
        },
      });

      if (!events) return;

      for (let event of events) {
        const data = (await event.data.json()) as Event;
        console.log(event);
        setEvents((p) => [...p, data]);
      }

      const { protocols, status } = await web5.client.dwn.protocols.query({
        message: {
          filter: {
            protocol: protocolDefinition.protocol,
          },
        },
      });

      if (status.code !== 200) {
        alert("Error querying protocols");
        console.error("Error querying protocols", status);
        return;
      }
      if (protocols.length > 0) {
        console.log("Protocol already exists");
        return;
      }

      const { status: configureStatus, protocol } =
        await web5.client.dwn.protocols.configure({
          message: {
            definition: protocolDefinition,
          },
        });

      protocol?.send(web5.userId);
      console.log("Protocol configured", configureStatus, protocol);
    }
  }

  async function createSharedList(newEvent: Event) {
    if (!hasContextLoaded(web5)) return;

    const sharedListData = {
      "@type": "event",
      ...newEvent,
    };

    try {
      const { record } = await web5.client.dwn.records.create({
        data: sharedListData,
        store: false,
        message: {
          protocol: protocolDefinition.protocol,
          protocolPath: "event",
          schema: protocolDefinition.types.event.schema,
          published: true,
        },
      });

      if (!record) throw new Error("Failed record");

      const data = await record.data.json();

      setEvents((p) => [...p, data]);

      console.log("sending", record.send(web5.userId));
    } catch (e) {
      console.error(e);
      return;
    }
  }

  async function readPublicEvents(did: string) {
    setPub([]);
    if (hasContextLoaded(web5)) {
      const { records: events } = await web5.client.dwn.records.query({
        from: did,
        message: {
          filter: {
            schema: protocolDefinition.types.event.schema,
            protocol: protocolDefinition.protocol,
            protocolPath: "event",
          },
          dateSort: DateSort.CreatedAscending,
        },
      });

      if (!events) return;

      for (let event of events) {
        const data = (await event.data.json()) as Event;
        setPub((p) => [...p, data]);
      }
    }
  }

  useEffect(() => {
    if (!web5.loading && !flag.current) {
      flag.current = true;
      loadData();
    }
  }, [web5.loading]);

  return (
    <>
      <div className="m-10">
        <p
          className="truncate cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(web5.userId || "");
            alert("copied");
          }}
        >
          {web5.userId}
        </p>

        <DataForm.Container
          className="flex flex-col my-10 gap-y-3 items-start"
          onSubmit={(data) =>
            createSharedList({
              type: VotingType.Singular,
              createdAt: new Date().getTime(),
              currentWinningOutcome: { uid: "", votes: 0 },
              expires: new Date(data.date).getTime(),
              metadata: { name: data.name, uid: data.uid },
              votes: {},
            })
          }
        >
          <DataForm.Input name="name" />
          <DataForm.Input name="date" type="date" className="w-[50vw]" />
          <DataForm.Input name="uid" minLength={3} maxLength={5} />

          <DataForm.Input
            type="submit"
            className="bg-blue-700 px-5 py-2 rounded border-none"
          />
        </DataForm.Container>
      </div>

      <div className="my-20 flex flex-col gap-y-2 mx-10">
        {events.map((item, key) => (
          <p className="border" key={key}>
            {JSON.stringify(item)}
          </p>
        ))}
      </div>

      <div className="bg-white bg-opacity-10 p-10">
        <DataForm.Container
          onSubmit={(data) => {
            readPublicEvents(data.did);
          }}
          className="flex"
        >
          <DataForm.Input name="did" />
          <DataForm.Input type="submit" />
        </DataForm.Container>

        <div className="py-10">
          {pub.map((item, key) => (
            <p className="border" key={key}>
              {JSON.stringify(item)}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
