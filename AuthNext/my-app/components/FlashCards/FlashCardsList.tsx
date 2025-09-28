"use client";

import { useState, useEffect } from "react";
import FlashCard, { Kanji } from "@/components/FlashCards/FlashCard";

export default function FlashCardsList() {
    const [selectedLevel, setSelectedLevel] = useState<string>("N4");
    const [kanjiData, setKanjiData] = useState<Kanji[]>([]);
    const [loading, setLoading] = useState(false);

    const disabledLevels = ["N1", "N2", "N3"];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/kanji?level=${selectedLevel}`);
                const json = await res.json();
                setKanjiData(json);
            } catch (err) {
                console.error("Error fetching kanji:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedLevel]);

    return (
        <div>
            <div className="flex gap-2 mb-6 justify-center">
                {["N1", "N2", "N3", "N4", "N5"].map(level => {
                    const isDisabled = disabledLevels.includes(level);

                    return (
                        <button
                            key={level}
                            onClick={() => !isDisabled && setSelectedLevel(level)}
                            disabled={isDisabled}
                            className={`px-4 py-2 rounded font-medium ${selectedLevel === level
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}

                        >
                            {level}
                        </button>
                    );
                })}
            </div>

            {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
                    {kanjiData.map(k => (
                        <FlashCard key={k._id} kanji={k} />
                    ))}
                </div>
            )}
        </div>
    );
}
