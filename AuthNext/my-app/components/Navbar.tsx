"use client";

import Link from "next/link";
import { FC } from "react";

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
    const authLinks: NavLink[] = [
        { label: "Login", href: "/auth/login" },
        { label: "Signup", href: "/signup" },
    ];

    const allLinks = [...links, ...authLinks];

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    {brand}
                </Link>

                <div className="flex gap-6">
                    {allLinks.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
