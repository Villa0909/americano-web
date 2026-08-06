"use client";

import Image from "next/image";
import { useState } from "react";

import { uploadPlayerImage } from "@/lib/storage";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    try {
      setLoading(true);

      const url = await uploadPlayerImage(file);

      onChange(url);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">

      <div className="relative h-72 w-56 overflow-hidden rounded-xl border bg-zinc-100">

        {value ? (

          <Image
            src={value}
            alt=""
            fill
            className="object-cover"
          />

        ) : (

          <div className="flex h-full items-center justify-center text-zinc-400">
            Sin imagen
          </div>

        )}

      </div>

      <input
        type="file"
        accept="image/*"
        disabled={loading}
        onChange={(e) => {
          if (!e.target.files?.length) return;

          upload(e.target.files[0]);
        }}
      />

      {loading && (
        <p>Subiendo...</p>
      )}

    </div>
  );
}