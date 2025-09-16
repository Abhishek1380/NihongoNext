"use client";

import { useState, useEffect } from "react";

interface Note {
  _id: string;
  text: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = async () => {
    if (!text) return;
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const newNote = await res.json();
      setNotes([...notes, newNote]);
      setText("");
    }
  };

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center">📝 Notes App</h1>

      <div className="flex mt-6">
        <input
          className="flex-1 border rounded p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addNote}
        >
          Add
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {notes.map((note) => (
          <li
            key={note._id}
            className="border p-3 rounded shadow-sm bg-gray-50"
          >
            {note.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
