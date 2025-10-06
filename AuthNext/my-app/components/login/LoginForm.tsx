"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                alert(data.message);
                router.push("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-80 mx-auto mt-20 p-6 border rounded shadow-md"
        >
            <h2 className="text-2xl font-bold text-center">Login</h2>

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

            <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
