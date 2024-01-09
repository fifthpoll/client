import DataForm from "../../../common/DataForm";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <DataForm.Container
        className="flex justify-center p-page mt-10 mb-14"
        onSubmit={(data) => navigate(`/completed/${data.did}`)}
      >
        <DataForm.Input
          className="border border-front border-opacity-40 p-4 text-xl rounded-l-xl w-[60vw]"
          name="did"
          placeholder="Enter different Did to search"
        />
        <DataForm.Input
          className="border border-front bg-black text-white px-6 rounded-r-xl duration-300 hover:bg-white hover:text-black hover:border-opacity-40 hover:border-l-transparent"
          type="submit"
        />
      </DataForm.Container>
    </header>
  );
}
