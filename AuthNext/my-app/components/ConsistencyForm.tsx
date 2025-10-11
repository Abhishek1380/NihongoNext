"use client";
import { useState, useEffect } from "react";

export default function ConsistencyForm() {
    const [paragraphsRead, setParagraphsRead] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        fetch("/api/consistency", {
            headers: { "Authorization": `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => setParagraphsRead(data.paragraphsRead));
    }, [token]);

    const handleUpdate = async () => {
        if (!token) return alert("Not logged in");
        await fetch("/api/consistency", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ paragraphsRead }),
        });
        alert("Updated!");
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <label className="block mb-2">Paragraphs read today:</label>
            <input
                type="number"
                className="border p-2 w-full mb-4"
                value={paragraphsRead}
                onChange={(e) => setParagraphsRead(Number(e.target.value))}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
            >
                Mark as Read
            </button>
        </div>
    );
}
