"use client";

import { FC, useState } from "react";
import Link from "next/link";
import LoginForm from "./login/LoginForm";
import SignupForm from "./signup/SignupForm";

interface NavLink {
    label: string;
    href: string;
}

interface NavbarProps {
    brand?: string;
    links?: NavLink[];
}

const Navbar: FC<NavbarProps> = ({
    brand = "MyApp",
    links = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ],
}) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);

    const authLinks = [
        { label: "Login", action: () => setOpenLogin(true) },
        { label: "Signup", action: () => setOpenSignup(true) },
    ];

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    {brand}
                </Link>

                <div className="flex gap-6">
                    {links.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            {label}
                        </Link>
                    ))}

                    {authLinks.map(({ label, action }) => (
                        <button
                            key={label}
                            onClick={action}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {openLogin && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96 relative">
                        <button
                            onClick={() => setOpenLogin(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <LoginForm onClose={() => setOpenLogin(false)} />
                    </div>
                </div>
            )}

            {openSignup && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96 relative">
                        <button
                            onClick={() => setOpenSignup(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <SignupForm onClose={() => setOpenSignup(false)} />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
