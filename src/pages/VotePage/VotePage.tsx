import React, { useState } from "react";
import voting from "../../protocols/voting";
import DataForm from "../../common/DataForm";
import { VotingType } from "../../types";

export default function VotePage() {
  const [did, setDid] = useState("none");

  const events = voting.getEventsPublishedByDid(did);

  return (
    <div className="p-page mt-8">
      <DataForm.Container
        onSubmit={(data) => setDid(data.did)}
        className="flex gap-x-2"
      >
        <DataForm.Input
          name="did"
          required
          minLength={8}
          className="border border-front border-opacity-30 p-1 rounded"
        />
        <DataForm.Input
          type="submit"
          className="bg-foreground text-back px-8 rounded"
        />
      </DataForm.Container>

      <div className="flex flex-col mt-5">
        {events.isLoading ? (
          <>Loading...</>
        ) : (
          <>
            {events.data.length == 0 ? (
              "No ongoing events for given did"
            ) : (
              <>
                <h2 className="w-[80vw] whitespace-nowrap truncate my-8">
                  Events by {did}
                </h2>
                <div className="flex flex-wrap gap-4">
                  {events.data.map((event, key) => (
                    <>
                      <div
                        className="w-[calc(20%_-_13px)] rounded border border-front border-opacity-40 shadow p-4 flex"
                        key={key}
                      >
                        <div className="flex flex-col justify-center gap-y-3 w-[6em]">
                          <h2 className="text-3xl uppercase font-light">
                            {event.metadata.uid}
                          </h2>

                          <p className="text-sm text-front text-opacity-70">
                            {event.metadata.name}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
