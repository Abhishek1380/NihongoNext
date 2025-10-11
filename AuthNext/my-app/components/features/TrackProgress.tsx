"use client";

import { useEffect, useState } from "react";

export default function ReadingTracker() {
    const userId = "user123"; // hardcoded for now
    const [reading, setReading] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReading = async () => {
            try {
                const res = await fetch(`/api/reading?userId=${userId}`);
                const data = await res.json();
                setReading(data.reading);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReading();
    }, []);

    const incrementReading = async () => {
        try {
            const res = await fetch("/api/reading", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });
            const data = await res.json();
            setReading(data.reading);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Reading Progress</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-1">Currently Read:</label>
                <input
                    type="number"
                    value={reading}
                    readOnly
                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                />
            </div>
            <button
                onClick={incrementReading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors duration-200"
                disabled={loading}
            >
                Increment Reading
            </button>
        </div>
    );
}
