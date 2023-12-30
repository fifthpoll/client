import { useEffect, useState } from "react";
import voting from "../../protocols/voting";
import DataForm from "../../common/DataForm";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../common/Icon";
import useModal from "../../hooks/useModal";
import { Event } from "../../types";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { getObjectKeys, getRandomLightColorArray } from "../../utils";

export default function VotePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const [did, setDid] = useState(urlParams.get("did") || "none");

  const events = voting.getEventsPublishedByDid(did);

  const modal = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?did=${did}`);
  }, [did]);

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
                      <button
                        className="w-[calc(20%_-_13px)] relative rounded border border-front border-opacity-30 duration-300 shadow p-4 flex text-left group hover:border-opacity-100"
                        key={key}
                        onClick={() =>
                          modal.show(<EventDetails event={event} />)
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

function EventDetails(props: { event: Event }) {
  const { event } = props;

  Chart.register(ArcElement, Tooltip, Legend);

  const modal = useModal();

  return (
    <div className="bg-background rounded-lg flex flex-col gap-y-3 w-[40vw]">
      <div className="flex gap-x-5 items-end px-4 pt-4 border-opacity-30">
        <h1 className="text-3xl font-medium">{event.metadata.uid}</h1>
        <h3 className="text-base font-light">{event.metadata.name}</h3>
        <div className="flex-1 flex items-center self-stretch">
          <div className="flex-1" />
          <button onClick={modal.hide}>
            <Icon
              icon="close"
              className="flex-1 pt-1 text-3xl text-red-500 cursor-pointer"
            />
          </button>
        </div>
      </div>
      <p className="px-4 pb-2 text-sm text-front text-opacity-70 border-b border-front border-opacity-30">
        {event.metadata.description}
      </p>

      {event.currentWinningOutcome.uid && (
        <div className="flex p-2">
          <div className="flex w-1/2 basis-1/2">
            <Pie
              data={{
                labels: getObjectKeys(event.votes),
                datasets: [
                  {
                    label: "Votes : ",
                    data: getObjectKeys(event.votes).map(
                      (v) => event.votes[v].votes + 1
                    ),
                    borderWidth: 1,
                    backgroundColor: getRandomLightColorArray(
                      getObjectKeys(event.votes).length
                    ),
                  },
                ],
              }}
            />
          </div>
          <div className="basis-1/2 flex flex-col ">
            <h1 className="text-xl">Current winner : </h1>
            <p>
              {event.currentWinningOutcome.uid} is winning with{" "}
              {event.currentWinningOutcome.votes} votes
            </p>
          </div>
        </div>
      )}

      <div className=""></div>
    </div>
  );
}
