"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Paragraph {
    _id: string;
    japanese_paragraph: string;
    romaji_paragraph: string;
    english_paragraph: string;
    length?: string;
    level?: string;
    date?: string;
    img?: string;
}

export default function ParagraphReader() {
    const params = useParams();
    const paragraphId = params?.id; // coming from URL
    const [paragraph, setParagraph] = useState<Paragraph | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(30); // default 30 sec
    const [isTimeOver, setIsTimeOver] = useState(false);

    // Fetch paragraph by ID
    useEffect(() => {
        if (!paragraphId) return;

        const fetchParagraph = async () => {
            try {
                const res = await fetch(`/api/paragraphs/${paragraphId}`);
                const data = await res.json();
                setParagraph(data);

                // Optional: set time based on paragraph length
                if (data.length === "short") setTimeLeft(20);
                else if (data.length === "medium") setTimeLeft(40);
                else if (data.length === "long") setTimeLeft(60);
            } catch (err) {
                console.error(err);
            }
        };

        fetchParagraph();
    }, [paragraphId]);

    // Timer countdown
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsTimeOver(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleMarkAsRead = () => {
        console.log("Marked as read:", paragraph?._id);
        alert("Paragraph marked as read ✅");
        // Here you can send POST request to update user tracker
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <p className="text-xl text-gray-800 leading-relaxed mb-6">
                {paragraph ? paragraph.japanese_paragraph : "Loading..."}
            </p>

            <div className="flex items-center justify-between mb-6">
                <span className="text-gray-700 font-medium">Time remaining:</span>
                <span className="text-green-600 font-bold text-lg">
                    {timeLeft}s
                </span>
            </div>

            <div className="flex justify-end">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isTimeOver}
                    onClick={handleMarkAsRead}
                >
                    Mark as Read
                </button>
            </div>
        </div>
    );
}
