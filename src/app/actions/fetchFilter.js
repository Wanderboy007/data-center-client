"use server"
export default async function fetchFilter() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/devices-filter`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();

}