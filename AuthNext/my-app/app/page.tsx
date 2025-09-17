"use client";

import { useState } from "react";
import FlashCard from "@/components/FlashCard";
import { kanjiData } from "@/data/kanjiData";

export default function Home() {
  const [page, setPage] = useState(0);
  const cardsPerPage = 30;

  const totalPages = Math.ceil(kanjiData.length / cardsPerPage);
  const start = page * cardsPerPage;
  const end = start + cardsPerPage;
  const currentCards = kanjiData.slice(start, end);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Kanji Flashcards</h1>

      <div className="grid grid-cols-6 gap-4 justify-center">
        {currentCards.map((k) => (
          <FlashCard key={k.kanji} kanji={k} />
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
    </main>
  );
}
