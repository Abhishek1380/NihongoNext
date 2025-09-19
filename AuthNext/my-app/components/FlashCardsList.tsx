"use client";

import FlashCard from "@/components/FlashCard";


interface Kanji {
    _id: string;
    kanji: string;
    onyomi: string[];
    kunyomi: string[];
    meaning: string;
    jlpt_level: string;
    default_difficulty: number;
}

interface FlashCardsListProps {
    data: Kanji[];
}

export default function FlashCardsList({ data }: FlashCardsListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {data.map((k) => (
                <FlashCard key={k._id} kanji={k} />
            ))}
        </div>
    );
}
