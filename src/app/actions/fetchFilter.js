"use server"
export default async function fetchFilter() {
    const res = await fetch("http://127.0.0.1:5000/api/devices-filter");
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();

}