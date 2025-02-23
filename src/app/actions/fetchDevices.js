'use server';

export async function fetchDataCenters() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/device-list`);
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


// 'use server';

// export async function fetchDataCenters() {
//     try {
//         // Simulating a delay to mimic a real API call
//         await new Promise((resolve) => setTimeout(resolve, 500));

//         // Returning fake data for now
//         return [
//             'HYBD',
//             'NPIC-HYBD',
//             'DEL-1',
//             'BGLR-DC',
//             'MUM-DC2'
//         ];
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }
