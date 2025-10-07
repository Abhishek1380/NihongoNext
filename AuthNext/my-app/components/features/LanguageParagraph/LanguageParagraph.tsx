"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";


interface Paragraph {
    _id: string;
    japanese_paragraph: string;
    romaji_paragraph: string;
    english_paragraph: string;
    length: string;
    level: string;
    date: string;
    img: string;
}

export default function LanguageParagraph() {
    const router = useRouter();
    const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);

    useEffect(() => {
        const fetchParagraphs = async () => {
            const res = await fetch("/api/paragraphs");
            const data: Paragraph[] = await res.json();
            setParagraphs(data);
        };
        fetchParagraphs();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-6 space-y-6">
            {paragraphs.map((para) => (
                <div key={para._id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <p className="text-xl text-gray-800 leading-relaxed mb-4">
                        {para.japanese_paragraph}
                    </p>
                    <div className="flex justify-end">
                        <Link href={`/paragraph/${para._id}`}>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                            >
                                Read Paragraph
                            </button>
                        </Link>
                    </div>
                </div>
            ))
            }
        </div >
    );
}
