"use client";

import { ReactNode } from "react";

interface SidebarProps {
    children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
    return (
        <aside className="fixed h-screen w-64 border-r bg-white shadow-sm">
            <nav className="flex h-full flex-col p-4">
                {/* Logo */}
                <div className="mb-6 flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-indigo-600">Admin</h1>
                </div>

                {/* Navigation */}
                <ul className="flex-1 space-y-2">{children}</ul>

                {/* Footer */}
                <div className="mt-auto border-t pt-4">{/* Můžeš tam dát třeba logout button */}</div>
            </nav>
        </aside>
    );
}
