import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(timer);
        }
        setShowFlash(false);
    }, [flash]);

    const linkClass = (active) =>
        `px-3 py-2 text-sm font-medium rounded-md ${
            active
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:text-gray-900"
        }`;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-600 mr-4">
                                HelpDesk
                            </span>
                            <div className="hidden sm:flex gap-1">
                                <Link
                                    href={route("dashboard")}
                                    className={linkClass(
                                        route().current("dashboard")
                                    )}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route("tickets.index")}
                                    className={linkClass(
                                        route().current("tickets.*") &&
                                            !route().current("tickets.create")
                                    )}
                                >
                                    Tickets
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-4">
                            <Link
                                href={route("tickets.create")}
                                className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                            >
                                + New Ticket
                            </Link>
                            <span className="text-sm text-gray-700">
                                {auth.user.name}
                            </span>
                            <Link
                                method="post"
                                href={route("logout")}
                                as="button"
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Logout
                            </Link>
                        </div>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="sm:hidden border-t border-gray-200 px-4 py-3 space-y-2">
                        <p className="text-sm text-gray-500">
                            Signed in as {auth.user.name}
                        </p>
                        <Link
                            href={route("dashboard")}
                            className="block text-gray-700"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("tickets.index")}
                            className="block text-gray-700"
                        >
                            Tickets
                        </Link>
                        <Link
                            href={route("tickets.create")}
                            className="block text-indigo-600 font-medium"
                        >
                            + New Ticket
                        </Link>
                        <Link
                            method="post"
                            href={route("logout")}
                            as="button"
                            className="block text-gray-700"
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {showFlash && flash?.success && (
                <div className="bg-green-100 text-green-800 px-4 py-3 flex justify-between items-center">
                    <span>{flash.success}</span>
                    <button
                        onClick={() => setShowFlash(false)}
                        aria-label="Dismiss"
                    >
                        ×
                    </button>
                </div>
            )}
            {showFlash && flash?.error && (
                <div className="bg-red-100 text-red-800 px-4 py-3 flex justify-between items-center">
                    <span>{flash.error}</span>
                    <button
                        onClick={() => setShowFlash(false)}
                        aria-label="Dismiss"
                    >
                        ×
                    </button>
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}
