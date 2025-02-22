'use client';

import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-grow h-full overflow-y-auto bg-gray-100 p-4">
                {children}
            </main>
        </div>
    );
}
