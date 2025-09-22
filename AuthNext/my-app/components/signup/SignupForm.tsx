"use client";
import { useState, FormEvent } from 'react';

export default function SignupForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await res.json();
        alert(data.message);
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Sign Up
            </button>
        </form>
    );
}
