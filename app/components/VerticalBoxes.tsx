import React from "react";

export function VerticalBoxes({ boxes }) {
  return (
    <div className="flex flex-col bg-white mx-4 md:mx-auto max-w-4xl divide-y md:divide-x divide-gray-100">
      {boxes.map((box) => (
        <div className="flex flex-col justify-center w-full p-6 text-center tracking-widest">
          <h3>{box.title}</h3>
          <h3 className="text-2xl mt-2">
            <p>{box.text}</p>
          </h3>
        </div>
      ))}
    </div>
  );
}
