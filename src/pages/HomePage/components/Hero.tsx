import DataForm from "../../../common/DataForm";
import useWeb5 from "../../../contexts/web5context";

export default function Hero(props: {
  setRecords: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}) {
  const web5 = useWeb5();

  async function handleAddTodo(data: Record<string, string>) {
    if (!web5.client || !web5.userId) return;
    const newTodo = await web5.client.dwn.records.create({
      data: { title: data.todo },
      message: {
        schema: "https://marsian.dev",
        dataFormat: "application/json",
        published: true,
      },
    });
    const status = await newTodo.record?.send(web5.userId);
    console.log(status?.status);
    const todoData = await newTodo.record?.data.json();
    props.setRecords((r) => [...(r || []), todoData]);
  }

  return (
    <section>
      <DataForm.Container
        onSubmit={handleAddTodo}
        className="flex justify-center gap-x-2"
      >
        <DataForm.Input
          name="todo"
          className="bg-transparent border border-front px-3 py-1 rounded"
          required
        />
        <DataForm.Input
          type="submit"
          className="bg-teal-400 px-6 py-1 rounded text-black cursor-pointer"
        />
      </DataForm.Container>
    </section>
  );
}
