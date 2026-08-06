"use client";

import { Share2 } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function ShareButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition hover:scale-105 hover:bg-zinc-100"
    >
      <Share2 className="h-5 w-5" />
    </button>
  );
}