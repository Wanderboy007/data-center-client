'use server';

export default async function fetchAlarms() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/device-alarms`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Return only the first 50 items if data is an array
        return Array.isArray(data) ? data.slice(0, 100) : data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}