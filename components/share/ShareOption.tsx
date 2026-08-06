"use client";

import { ReactNode } from "react";
import { Check } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function ShareOption({
  title,
  description,
  icon,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-5

        rounded-2xl

        px-6
        py-5

        transition-all

        ${
          selected
            ? "bg-white"
            : "bg-zinc-800 hover:bg-zinc-700"
        }
      `}
    >
      <div
        className={`
          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-full

          ${
            selected
              ? "bg-zinc-200"
              : "bg-zinc-700"
          }
        `}
      >
        {icon}
      </div>

      <div className="text-left">

        <h3
          className={
            selected
              ? "text-xl font-bold text-black"
              : "text-xl font-bold text-white"
          }
        >
          {title}
        </h3>

        <p
          className={
            selected
              ? "text-zinc-700"
              : "text-zinc-400"
          }
        >
          {description}
        </p>

      </div>

      <div className="ml-auto">

        {selected && (

          <Check
            size={24}
            className="text-black"
          />

        )}

      </div>

    </button>
  );
}