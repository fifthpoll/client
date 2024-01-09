import React from "react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Cast Vote in an event",
    imageUrl: "/vote-action.png",
    link: "/vote",
  },
  {
    title: "Start your own event",
    imageUrl: "/event-action.png",
    link: "/new",
  },
];

export default function ActionsPage() {
  const navigate = useNavigate();

  return (
    <section className="h-[83vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-light mb-12">
        Hey! What would you like to do?
      </h1>
      <div className="flex justify-center gap-x-[8vw]">
        {actions.map((action, key) => (
          <div
            key={key}
            onClick={() => navigate(action.link)}
            className="flex flex-col items-center w-[20vw] overflow-hidden group duration-300 cursor-pointer border border-front shadow-md rounded-2xl border-opacity-20"
          >
            <div className="relative duration-inherit overflow-hidden border-b border-front border-opacity-50">
              <img
                src={action.imageUrl}
                alt={action.title.split(" ").join("+")}
                className="duration-inherit scale-105 group-hover:scale-125"
              />
              <div className="absolute-cover bg-primary mix-blend-color group-hover:bg-secondary duration-inherit" />
            </div>

            <h2 className="my-4 text-xl font-medium">{action.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}
