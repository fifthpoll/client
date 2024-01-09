import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import Icon from "../../../common/Icon";

interface ModalVotersDefinitionProps {
  votersState: {
    voters: string[];
    setVoters: React.Dispatch<React.SetStateAction<string[]>>;
  };
}

export default function ModalVotersDefinition(
  props: ModalVotersDefinitionProps
) {
  const [voters, setVoters] = useState(props.votersState.voters);

  const modal = useModal();

  useEffect(() => {
    if (voters[voters.length - 1] !== "") setVoters((p) => [...p, ""]);
  }, [voters]);

  return (
    <div className="bg-background p-5 rounded-lg flex flex-col items-center">
      <div className="flex flex-col gap-y-2 mb-5 self-stretch max-h-[40vh] overflow-y-scroll pr-4">
        {voters.map((voter, key) => (
          <div className="flex items-stretch">
            <input
              key={key}
              defaultValue={voter}
              onChange={(event) => {
                const newVoters = [...voters];
                newVoters[key] = event.target.value;
                setVoters(newVoters);
              }}
              placeholder="Enter Did"
              className="p-1 rounded-md border border-front border-opacity-20 rounded-r-none"
            />
            {key != voters.length - 1 && (
              <button
                tabIndex={-1}
                className="aspect-square flex justify-center items-center px-2 text-white bg-red-500 rounded-r-md"
                onClick={() => {
                  setVoters(voters.filter((_, k) => k != key));
                }}
              >
                <Icon icon="delete" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-x-8 self-stretch duration-300">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-md duration-inherit hover:bg-red-700"
          onClick={modal.hide}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md duration-inherit hover:bg-green-700"
          onClick={() => {
            const p = [...voters];
            p.pop();
            props.votersState.setVoters(p);
            modal.hide();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
