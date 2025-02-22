'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
    const [currentTime, setCurrentTime] = useState('');
    const pathname = usePathname(); // get current path

    // Format date as "Nov, 1st, 2024"
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date());

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            }));
        };

        updateClock(); // Initial call
        const intervalId = setInterval(updateClock, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    // Updated function with improved font classes for navigation links
    const getLinkClasses = (linkPath) =>
        `p-2 rounded hover:bg-gray-200 ${pathname === linkPath ? 'bg-gray-300 text-lg font-semibold' : 'text-lg font-medium'
        }`;

    return (
        <aside className="w-64 bg-[#2A3E6F] shadow-md h-full p-4 flex flex-col">
            {/* Date and Time Display */}
            <div className="mb-10">
                <p className="text-2xl text-[#AAC2E9] font-semibold">{formattedDate}</p>
                <p className="text-2sm text-[#AAC2E9]">{currentTime}</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2">
                <Link href="/overview" className={getLinkClasses('/overview')}>
                    Overview
                </Link>
                <Link href="/devices" className={getLinkClasses('/devices')}>
                    Devices
                </Link>
                <Link href="/alerts" className={getLinkClasses('/alerts')}>
                    Alerts
                </Link>
            </nav>
        </aside>
    );
};
