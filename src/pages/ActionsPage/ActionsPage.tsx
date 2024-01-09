import React from "react";

const actions = [
  { title: "", imageUrl: "/vote-action.png", content: "" },
  { title: "", imageUrl: "/vote-action.png", content: "" },
];

export default function ActionsPage() {
  return (
    <section className="h-screen flex items-center justify-center gap-x-10">
      {actions.map((action, key) => (
        <div className="flex flex-col items-center w-[20vw] p-4 border border-front shadow-md rounded-2xl border-opacity-20">
          <div className="relative">
            <img
              src={action.imageUrl}
              alt={action.title.split(" ").join("+")}
            />
            <div className="absolute-cover bg-primary mix-blend-color" />
          </div>
        </div>
      ))}
    </section>
  );
}
