import React from "react";

const actions = [
  { title: "", imageUrl: "", content: "" },
  { title: "", imageUrl: "", content: "" },
];

export default function ActionsPage() {
  return (
    <section className="h-screen flex items-center justify-center">
      {actions.map((action, key) => (
        <div className="flex flex-col items-center">
          <img src={action.imageUrl} alt={action.title.split(" ").join("+")} />
        </div>
      ))}
    </section>
  );
}
