'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Doctors', href: '/doctors' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                            ClinicProX
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map(({ label, href }) => (
                            <div key={href} className="relative group">
                                <Link
                                    href={href}
                                    className={`text-base font-medium transition-colors ${pathname === href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                >
                                    {label}
                                </Link>
                                {pathname === href && (
                                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                                )}
                                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                            </div>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="hidden md:block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-500 px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-teal-600"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}