import React, { useState } from "react";
import DataForm from "../../common/DataForm";
import voting from "../../protocols/voting";
import { twMerge } from "tailwind-merge";
import { Event, VotingType } from "../../types";
import useModal from "../../hooks/useModal";
import ModalVotersDefinition from "./components/ModalVotersDefinition";

const fields: Parameters<typeof DataForm.Input>[0][] = [
  {
    name: "name",
    title: "name",
    placeholder: "Name of your event",
    required: true,
  },
  {
    name: "uid",
    title: "Unique Identifier",
    placeholder: "Choose a UID for your event (3 to 5 characters)",
    minLength: 3,
    maxLength: 5,
    required: true,
  },
  {
    title: "Description",
    placeholder: "Describe your event (optional)",
    name: "description",
  },
  {
    title: "Expiration",
    placeholder: "Till when does the event go on",
    name: "expires",
    required: true,
    type: "datetime-local",
    min: new Date().toLocaleDateString("fr-ca"),
    max: (Date.now() + 7 * 365 * 24 * 60 * 60 * 1000).toLocaleString(),
  },
  {
    title: "Allow recasting votes",
    placeholder: "Should voters be allowed to change their decisions",
    name: "canRecast",
    type: "checkbox",
  },
];

export default function NewEventPage() {
  const publish = voting.getPublishEventAction();

  const [outcomes, setOutcomes] = useState<{ uid: string; title: string }[]>(
    []
  );

  const [voters, setVoters] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const { show } = useModal();

  return (
    <div className="flex flex-col items-center py-16">
      <DataForm.Container
        clearAfterSubmit
        className="p-page py-10 flex flex-col gap-y-5 w-max p-5 shadow border border-front border-opacity-20 rounded-lg"
        onSubmit={(data) => {
          if (outcomes.length < 2) {
            alert("Please add atleast 2 outcomes");
            throw new Error("Please add atleast 2 outcomes");
          }
          const votes: Record<string, { title: string; votes: string[] }> = {};
          outcomes.forEach(
            (o) => (votes[o.uid] = { title: o.title, votes: [] })
          );
          const newEvent: Event = {
            type: VotingType.Singular,
            metadata: {
              name: data.name,
              uid: data.uid.toUpperCase(),
              description: data.description,
            },
            createdAt: new Date().getTime(),
            currentWinningOutcome: { uid: "", votes: 0 },
            expires: new Date(data.expires).getTime(),
            votes: votes,
            canRecast: data.canRecast == "on",
          };
          setLoading(true);
          setOutcomes([]);
          publish(newEvent, voters).then(() => setLoading(false));
        }}
      >
        <div className="self-center text-xl">Start a new Event</div>
        {fields.map((item, key) => (
          <div
            className="flex gap-x-5 w-full items-center justify-between"
            key={key}
          >
            {item.title && (
              <p className="capitalize flex justify-end flex-1">
                {item.title}{" "}
                {item.required && (
                  <span className="text-lg font-semibold text-red-700">*</span>
                )}
              </p>
            )}
            <DataForm.Input
              {...item}
              className={twMerge(
                "bg-transparent border border-front p-2 rounded w-[50vw]",
                item.className
              )}
            />
          </div>
        ))}
        <h1 className="mt-5 text-center text-lg">Possible Outcomes </h1>
        <OutcomesDeclaration outcomes={outcomes} setOutcomes={setOutcomes} />

        <button
          type="button"
          className="text-primary underline underline-offset-4 my-2"
          onClick={() => {
            show(<ModalVotersDefinition votersState={{ voters, setVoters }} />);
          }}
        >
          Who can vote?
        </button>

        <DataForm.Input
          type="submit"
          disabled={loading}
          className="w-max px-8 py-2 mt-3 rounded-full bg-primary text-back self-center disabled:cursor-not-allowed disabled:opacity-40"
        />
      </DataForm.Container>
    </div>
  );
}

function OutcomesDeclaration(props: {
  className?: string;
  outcomes: { uid: string; title: string }[];
  setOutcomes: React.Dispatch<
    React.SetStateAction<{ uid: string; title: string }[]>
  >;
}) {
  const { outcomes, setOutcomes } = props;
  const { show } = useModal();

  return (
    <div
      className={twMerge(
        "flex flex-wrap justify-center gap-2 px-10 w-[68vw]",
        props.className
      )}
    >
      {outcomes.map((item, key) => (
        <div
          key={key}
          className="w-[20vw] flex flex-col justify-center items-center py-2 border border-front rounded"
        >
          <h2 className="uppercase font-medium">{item.uid}</h2>
          <p className="px-3 pt-1 text-sm text-front text-opacity-70 truncate w-full">
            {item.title}
          </p>
        </div>
      ))}
      <button
        className="w-[20vw] flex justify-center items-center border border-front rounded py-5 text-2xl"
        type="button"
        onClick={() => {
          show(
            <ModalNewOutcome
              addFunction={(data) =>
                setOutcomes((p) => [...p, { uid: data.uid, title: data.title }])
              }
            />
          );
        }}
      >
        +
      </button>
    </div>
  );
}

function ModalNewOutcome(props: {
  addFunction: (data: Record<string, string>) => void;
}) {
  const { show, hide } = useModal();

  return (
    <DataForm.Container
      className="bg-background p-5 rounded-lg flex flex-col gap-y-5 w-[30vw]"
      onSubmit={(data) => {
        props.addFunction(data);
        hide();
      }}
    >
      <h1 className="font-medium text-xl">New Possible Outcome</h1>
      <DataForm.Input
        name="uid"
        placeholder="unique identifier (3-5 characters)"
        className="border border-front border-opacity-50 rounded-md p-1"
        minLength={3}
        maxLength={5}
        required
        aria-required
      />
      <DataForm.Input
        name="title"
        placeholder="What is this outcome"
        className="border border-front border-opacity-50 rounded-md p-1"
        required
        aria-required
      />

      <div className="flex gap-x-2">
        <DataForm.Input
          type="submit"
          value="Create"
          className="cursor-pointer bg-black text-white basis-1/2 py-2 rounded-md"
        />
        <button
          onClick={hide}
          className="cursor-pointer bg-red-600 text-white basis-1/2 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </DataForm.Container>
  );
}
