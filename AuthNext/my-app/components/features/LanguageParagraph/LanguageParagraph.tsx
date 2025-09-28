"use client";
import React, { useState, useEffect } from "react";

interface Paragraph {
    _id: string;
    japanese_paragraph: string;
    romaji_paragraph: string;
    english_paragraph: string;
}

const LanguageParagraph: React.FC = () => {
    const [data, setData] = useState<Paragraph[]>([]);
    const [displayMap, setDisplayMap] = useState<Record<string, "none" | "romaji" | "english">>({});

    useEffect(() => {
        fetch("/api/paragraphs")
            .then((res) => res.json())
            .then((paragraphs: Paragraph[]) => {
                setData(paragraphs);

                const initMap: Record<string, "none"> = {};
                paragraphs.forEach((p) => (initMap[p._id] = "none"));
                setDisplayMap(initMap);
            });
    }, []);

    const toggleParagraph = (id: string) => {
        setDisplayMap((prev) => ({
            ...prev,
            [id]:
                prev[id] === "none"
                    ? "romaji"
                    : prev[id] === "romaji"
                        ? "english"
                        : "none",
        }));
    };

    return (
        <div className="max-w-2xl mx-auto my-10 space-y-8">
            {data.map((p) => (
                <div key={p._id} className="p-6 border rounded-lg shadow-md bg-white">
                    <p className="text-lg font-medium text-gray-800">{p.japanese_paragraph}</p>

                    {displayMap[p._id] === "romaji" && (
                        <p className="mt-3 text-gray-600">{p.romaji_paragraph}</p>
                    )}
                    {displayMap[p._id] === "english" && (
                        <p className="mt-3 text-gray-600">{p.english_paragraph}</p>
                    )}

                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => toggleParagraph(p._id)}
                    >
                        {displayMap[p._id] === "none"
                            ? "Show Romaji"
                            : displayMap[p._id] === "romaji"
                                ? "Show English"
                                : "Hide"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LanguageParagraph;
