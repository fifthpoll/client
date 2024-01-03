import React from "react";
import DataForm from "../../../common/DataForm";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <DataForm.Container
        className="flex"
        onSubmit={(data) => navigate(`/completed/${data.did}`)}
      >
        <DataForm.Input className="" name="did" />
        <DataForm.Input type="submit" />
      </DataForm.Container>
    </header>
  );
}
