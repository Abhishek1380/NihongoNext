"use client";

import { useState } from "react";

export default function AdminParagraph() {
    const [form, setForm] = useState({
        japanese_paragraph: "",
        romaji_paragraph: "",
        english_paragraph: "",
        length: "medium",
        level: "N4",
        date: "",
        img: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/paragraphs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("✅ Paragraph added successfully!");
                setForm({
                    japanese_paragraph: "",
                    romaji_paragraph: "",
                    english_paragraph: "",
                    length: "medium",
                    level: "N4",
                    date: "",
                    img: "",
                });
            } else {
                setMessage(data.error || "❌ Failed to add paragraph");
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Something went wrong");
        }
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-6 border rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-6">Add New Paragraph</h1>

            {message && (
                <p className={`mb-4 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    name="japanese_paragraph"
                    placeholder="Japanese Paragraph"
                    value={form.japanese_paragraph}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="romaji_paragraph"
                    placeholder="Romaji Paragraph"
                    value={form.romaji_paragraph}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="english_paragraph"
                    placeholder="English Paragraph"
                    value={form.english_paragraph}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <div className="flex gap-4">
                    <select
                        name="length"
                        value={form.length}
                        onChange={handleChange}
                        className="p-2 border rounded w-1/2"
                    >
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                    </select>

                    <select
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        className="p-2 border rounded w-1/2"
                    >
                        <option value="N5">N5</option>
                        <option value="N4">N4</option>
                        <option value="N3">N3</option>
                    </select>
                </div>

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    name="img"
                    placeholder="Image URL (optional)"
                    value={form.img}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Add Paragraph
                </button>
            </form>
        </div>
    );
}
