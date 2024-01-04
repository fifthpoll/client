import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import voting from "../protocols/voting";
import useWeb5 from "../contexts/web5context";
import {
  arraySummision,
  getObjectKeys,
  getRandomLightColorArray,
  hasContextLoaded,
} from "../utils";
import { Event } from "../types";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import { Pie } from "react-chartjs-2";

export default function EventDetails(props: { event: Event; author: string }) {
  const { event } = props;
  const [loading, setLoading] = useState(false);
  const [userVotedFor, setUserVotedFor] = useState("");

  Chart.register(ArcElement, Tooltip, Legend);

  const modal = useModal();
  const castVote = voting.getCastVoteAction();

  const web5 = useWeb5();

  useEffect(() => {
    if (!hasContextLoaded(web5)) return;

    const o = getObjectKeys(event.votes).filter((key) =>
      event.votes[key].votes.includes(web5.userId)
    )[0];

    setUserVotedFor(o);
  }, []);

  const expired = event.expires < Date.now();

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

      <p
        className={twMerge(
          "px-4 flex gap-x-2 justify-center",
          expired ? "text-red-500" : "text-emerald-500"
        )}
      >
        end{expired ? "ed" : "s"}{" "}
        <span>{new Date(event.expires).toLocaleString()}</span>
        {!expired && (
          <>
            <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
          </>
        )}
      </p>

      {event.currentWinningOutcome.uid && (
        <div className="flex p-2">
          <div className="flex w-1/2 basis-1/2">
            <Pie
              data={{
                labels: getObjectKeys(event.votes),
                datasets: [
                  {
                    label: "Votes ",
                    data: getObjectKeys(event.votes).map(
                      (v) => event.votes[v].votes.length
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
          <div className="basis-1/2 flex flex-col justify-center">
            <h1 className="text-xl">Current winner : </h1>
            <p>
              {event.currentWinningOutcome.uid} is winning with{" "}
              {event.currentWinningOutcome.votes} votes at{" "}
              <span className="text-xs text-primary font-medium">
                {100 *
                  (event.currentWinningOutcome.votes /
                    arraySummision(
                      getObjectKeys(event.votes).map(
                        (k) => event.votes[k].votes.length
                      )
                    ))}
                %
              </span>
            </p>

            <p className="mt-5 text-lg">
              <span className="text-secondary text-xl mr-1 select-none">
                {">"}
              </span>
              {userVotedFor
                ? `You have voted for ${userVotedFor}`
                : "You have not voted"}
            </p>
          </div>
        </div>
      )}

      {!event.currentWinningOutcome.uid && <p></p>}

      {!expired && (
        <div className="flex flex-col">
          <h1 className="pl-4 pt-4 pb-2 text-lg font-light text-primary">
            Cast your vote :
          </h1>
          <div className="h-[25vh] overflow-y-scroll">
            {getObjectKeys(event.votes).map((outcome, key) => (
              <div
                key={key}
                className="flex p-4 items-center border-b border-front border-opacity-20"
              >
                <h1 className="w-[17%] text-xl">{outcome}</h1>
                <h2 className="flex-1 text-sm text-front text-opacity-80">
                  {event.votes[outcome].title}
                </h2>
                <button
                  disabled={loading}
                  className="bg-green-500 text-white px-6 py-2 rounded ml-4 duration-300 hover:bg-green-800 hover:text-emerald-300 disabled:cursor-not-allowed 
              disabled:opacity-50"
                  onClick={async () => {
                    setLoading(true);
                    event.id &&
                      (await castVote(props.author, event.id, outcome));
                    setLoading(false);
                    modal.hide();
                  }}
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
