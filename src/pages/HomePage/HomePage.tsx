import DataForm from "../../common/DataForm";
import useWeb5 from "../../contexts/web5context";
import voting from "../../protocols/voting";
import { VotingType } from "../../types";

export default function HomePage() {
  const web5 = useWeb5();
  const userPublishedEvents = voting.getUserPublishedEvents();
  const publishEvent = voting.getPublishEventAction();

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
          onSubmit={async (data) => {
            await publishEvent({
              type: VotingType.Singular,
              createdAt: new Date().getTime(),
              currentWinningOutcome: { uid: "", votes: 0 },
              expires: new Date(data.date).getTime(),
              metadata: { name: data.name, uid: data.uid },
              votes: {},
            });
            userPublishedEvents.refetch();
          }}
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
        {userPublishedEvents.data.map((item, key) => (
          <p className="border" key={key}>
            {JSON.stringify(item)}
          </p>
        ))}
      </div>

      {/* <div className="bg-white bg-opacity-10 p-10">
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
      </div> */}
    </>
  );
}
