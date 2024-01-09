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
    <div className="mt-8 flex items-center flex-col">
      <div className="text-4xl flex flex-col items-center gap-y-2 font-semibold tracking-tight p-page">
        <span>Cast your vote now &</span>
        <span>make a difference</span>
      </div>
      <div className="flex mt-12 p-page">
        <div className="w-[20%] mr-[4.2rem] flex flex-col justify-between">
          <div className="">
            <div className="text-3xl font-bold mb-3">Every Vote</div>
            <div className="text-sm">
              can make a difference in the result and some more randome words
              which make sense
            </div>
          </div>
          <div className="">
            <div className="text-3xl font-bold mb-3">70%</div>
            <div className="text-sm">
              people in india don't vote because of aalas
            </div>
          </div>
          <div className="flex flex-col">
            <img
              src="https://avatars.githubusercontent.com/u/96080203?v=4"
              className="w-[25%] rounded-full border-2 border-white"
            />
            <img
              src="https://avatars.githubusercontent.com/u/114365550?v=4"
              className="w-[25%] rounded-full -translate-y-4 border-2 border-white"
            />
            <div className="-translate-y-2 font-bold">The creators</div>
          </div>
        </div>
        <img src="/cast-vote.png" alt="cast" className="w-[50%]" />
        <div className="w-[24%] pl-8">
          <div>
            <div className="w-[6vw] bg-lime-400 h-[22vh] absolute -z-1" />
            <div className="pb-2 border-b-2 border-black w-[20vw] font-semibold text-xl pt-8 ml-4">
              Types of Voting
            </div>
            <div className="pt-4 text-sm w-[18vw] ml-4">
              Do you know there are 5 different types of voting, and soon we
              will have them all.
            </div>
          </div>
        </div>
      </div>
      <DataForm.Container
        onSubmit={(data) => setDid(data.did)}
        className="flex gap-x-4 mt-12 w-full justify-center"
      >
        <DataForm.Input
          name="did"
          required
          minLength={8}
          className="border-2 border-front border-opacity-60 px-4 py-4 rounded-2xl w-[70%] text-xl font-light"
          placeholder="Enter the DID of the person who started the event"
          defaultValue={did != "none" ? did : ""}
        />
        <DataForm.Input
          type="submit"
          className="bg-foreground text-back px-8 rounded-2xl text-[1.10rem]"
        />
      </DataForm.Container>

      <div className="bg-black bg-opacity-[0%] w-full p-0 mt-16">
        {/* {!events.isLoading && events.data && events.data.length > 0 && (
          <div className="p-page mt-10 mb-5 text-center">
            <h1 className="text-lg">Showing ongoing events by the user</h1>
            <Link
              to={`/completed/${did}`}
              className="text-primary underline hover:no-underline"
            >
              If you wish to view past events / results click here
            </Link>
          </div>
        )} */}

        <div className="flex flex-col">
          {events.isLoading ? (
            <>Loading...</>
          ) : (
            <>
              {events.data.length == 0 ? (
                <div className="items-center flex flex-col py-8 relative border-t-2 border-black mb-12">
                  <div className="h-[0.5vh] w-full bg-black mt-[0.1rem] bg-opacity-20 absolute top-0" />
                  <img
                    src="https://st.depositphotos.com/16203680/53343/v/450/depositphotos_533430192-stock-illustration-sad-cartoon-caricature-exclamation-mark.jpg"
                    className="h-[30vh]"
                  />
                  <div className="text-2xl tracking-tighter">
                    No ongoing events for given did
                  </div>
                </div>
              ) : (
                <div className="bg-black bg-opacity-[3%] p-page pb-16">
                  <div className="my-8">
                    <h2 className="text-3xl tracking-tighter font-medium">
                      Showing ongoing Events by
                    </h2>
                    <p className="whitespace-nowrap truncate w-[80vw] mt-2 border-2 p-4 rounded-xl bg-white text-lg font-light">
                      {did}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-12">
                    {events.data
                      .filter((d) => d.expires > Date.now())
                      .map((event, key) => (
                        // <>
                        <button
                          className="w-[calc(20%_-_13px)] bg-white relative rounded-xl border border-front border-opacity-20 duration-300 p-4 flex text-left group hover:border-opacity-100"
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
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
