"use client";

import { useRouter } from "next/navigation";

interface LoginFormProps {
    onClose: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const button = form.querySelector('button');
        const originalText = button?.textContent;

        if (button) {
            button.disabled = true;
            button.innerHTML = '<div class="spinner mr-2"></div>Logging in...';
        }

        try {
            const formData = new FormData(form);
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.get("email"),
                    password: formData.get("password")
                }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                onClose();
                router.push("/dashboard");
            } else {
                alert(data.message);
            }
        } catch {
            alert("Something went wrong.");
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = originalText || "Sign In";
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                    ✕
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <style jsx>{`
                .spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid transparent;
                    border-top: 2px solid currentColor;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
