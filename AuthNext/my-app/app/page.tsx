"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FlashCard, { Kanji } from "@/components/FlashCards/FlashCard";
import RomajiTyping from "@/components/features/RomajiTyping/RomajiTyping";
import LanguageParagraph from "@/components/features/LanguageParagraph/LanguageParagraph";
import AdminParagraph from "@/components/features/LanguageParagraph/AdminParagraph";

export default function Home() {
  const [kanjiData, setKanjiData] = useState<Kanji[]>([]);
  const [page, setPage] = useState(0);
  const cardsPerPage = 30;

  useEffect(() => {
    fetch("/api/kanji")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setKanjiData(data);
      });
  }, []);

  if (kanjiData.length === 0) return <div>Loading...</div>;

  const totalPages = Math.ceil(kanjiData.length / cardsPerPage);
  const start = page * cardsPerPage;
  const end = start + cardsPerPage;
  const currentCards = Array.isArray(kanjiData) ? kanjiData.slice(start, end) : [];

  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* <Navbar /> */}
      {/* <AdminParagraph />
      <LanguageParagraph />
      <RomajiTyping /> */}
      <LanguageParagraph />

      {/* <h1 className="text-3xl font-bold mb-6 text-center">Kanji Flashcards</h1>

      <div className="flex justify-center gap-4 mb-6">
        {["N1", "N2", "N3", "N4", "N5"].map((level) => (
          <button
            key={level}
            onClick={() => {
              fetch(`/api/kanji?level=${level}`)
                .then((res) => res.json())
                .then((data: Kanji[]) => {
                  setKanjiData(data);
                  setPage(0);
                });
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {level}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
        {currentCards.map((k) => (
          <FlashCard key={k._id} kanji={k} />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage(Math.max(page - 1, 0))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>

      <div className="text-center mt-2">
        Page {page + 1} of {totalPages}
      </div> */}
    </main>
  );
}
