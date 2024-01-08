import { useEffect, useState } from "react";
import voting from "../../protocols/voting";
import DataForm from "../../common/DataForm";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../common/Icon";
import useModal from "../../hooks/useModal";
import EventDetails from "../../common/EventDetails";

export default function VotePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const [did, setDid] = useState(urlParams.get("did") || "none");

  const events = voting.getEventsPublishedByDid(did);

  const modal = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?did=${did}`);
  }, [did]);

  console.log(events);

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

      {!events.isLoading && events.data && events.data.length > 0 && (
        <div className="p-page mt-10 mb-5 text-center">
          <h1 className="text-lg">Showing ongoing events by the user</h1>
          <Link
            to={`/completed/${did}`}
            className="text-primary underline hover:no-underline"
          >
            If you wish to view past events / results click here
          </Link>
        </div>
      )}

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
                  {events.data
                    .filter((d) => d.expires > Date.now())
                    .map((event, key) => (
                      // <>
                      <button
                        className="w-[calc(20%_-_13px)] relative rounded border border-front border-opacity-30 duration-300 shadow p-4 flex text-left group hover:border-opacity-100"
                        key={key}
                        onClick={() =>
                          modal.show(
                            <EventDetails event={event} author={did} />
                          )
                        }
                      >
                        <Icon
                          icon="open_in_new"
                          className="duration-300 absolute top-0 right-0 translate-x-1/2 group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100 translate-y-1/4 p-1 text-3xl
                           rounded-full bg-background text-front border border-front"
                        />
                        <div className="flex flex-col justify-center gap-y-3 w-[6em]">
                          <h2 className="text-3xl uppercase font-light">
                            {event.metadata.uid}
                          </h2>

                          <p className="text-sm text-front text-opacity-70">
                            {event.metadata.name}
                          </p>
                        </div>
                      </button>
                      // </>
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
