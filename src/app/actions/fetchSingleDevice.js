'use server';

export async function fetchSingleDevice(device, page = 1) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/cooling-system-analytics?device=${device}&page=${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}