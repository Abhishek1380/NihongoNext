"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first!");
            router.push("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch("/api/verify", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    localStorage.removeItem("token");
                    alert("Session expired. Please login again.");
                    router.push("/login");
                    return;
                }

                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-lg font-medium">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-2xl">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>

            {user ? (
                <>
                    <p className="text-gray-700 mb-4">Welcome, <span className="font-semibold">{user.email}</span> 👋</p>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/login");
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p className="text-gray-600">You are not authorized to view this page.</p>
            )}
        </div>
    );
}
