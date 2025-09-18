"use client";

import { useState, useEffect } from "react";

interface Kanji {
  _id: string;
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  jlpt_level: string;
  default_difficulty: number;
}

export default function FlashCard() {
  const [kanjiData, setKanjiData] = useState<Kanji[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    fetch("/api/kanji")
      .then((res) => res.json())
      .then((data: Kanji[]) => {
        if (data.length > 0) setKanjiData(data);
        else console.warn("Kanji API returned empty array");
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  if (kanjiData.length === 0) return <div>Loading...</div>;

  const currentKanji = kanjiData[currentIndex];

  const nextKanji = () => {
    setCurrentIndex((prev) => (prev + 1) % kanjiData.length);
    setFlipped(false);
  };

  const prevKanji = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? kanjiData.length - 1 : prev - 1
    );
    setFlipped(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-32 h-40 bg-red shadow-lg rounded-lg flex items-center justify-center cursor-pointer perspective"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ${flipped ? "rotate-y-180" : ""
            } transform-style preserve-3d`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center text-3xl font-bold">
            {currentKanji.kanji}
          </div>
          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center text-xl p-2 text-center">
            {currentKanji.meaning}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={prevKanji} className="px-3 py-1 bg-gray-300 rounded">
          Previous
        </button>
        <button onClick={nextKanji} className="px-3 py-1 bg-gray-300 rounded">
          Next
        </button>
      </div>
    </div>
  );
}
