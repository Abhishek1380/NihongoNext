"use client";

import { useState } from "react";
import { Kanji } from "@/data/kanjiData";

interface Props {
  kanji: Kanji;
}

export default function FlashCard({ kanji }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-32 h-40 bg-red shadow-lg rounded-lg flex items-center justify-center cursor-pointer perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        } transform-style preserve-3d`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center text-3xl font-bold">
          {kanji.kanji}
        </div>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center text-xl p-2 text-center">
          {kanji.meaning}
        </div>
      </div>
    </div>
  );
}
