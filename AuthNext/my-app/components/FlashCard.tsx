"use client";

import { useState } from "react";

export interface Kanji {
  _id: string;
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  jlpt_level: string;
  default_difficulty: number;
}

interface FlashCardProps {
  kanji: Kanji;
}

export default function FlashCard({ kanji }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-48 h-64 [perspective:1000px] cursor-pointer">
      <div
        onClick={() => setFlipped(!flipped)}
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
      >
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-white rounded-xl shadow-lg border border-gray-200 [backface-visibility:hidden]">
          <div className="text-5xl font-bold text-gray-800">{kanji.kanji}</div>
          {/* <div className="text-sm text-gray-500 mt-2">Click to flip</div> */}
        </div>

        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-indigo-100 rounded-xl shadow-lg border border-gray-200 [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
          <div className="text-3xl font-bold text-gray-800">{kanji.kanji}</div>
          <div className="text-lg text-gray-700 mb-2">{kanji.meaning}</div>

          <div className="text-sm text-gray-600">
            Onyomi: {kanji.onyomi.join(", ")}
          </div>
          <div className="text-sm text-gray-600">
            Kunyomi: {kanji.kunyomi.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}
