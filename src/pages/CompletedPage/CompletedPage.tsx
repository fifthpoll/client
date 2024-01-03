import { useParams } from "react-router-dom";
import Header from "./components/Header";

export default function CompletedPage() {
  const params = useParams();
  const did = params.did;

  return (
    <>
      <Header />
    </>
  );
}
