http://127.0.0.1:5000/api/device-alarms 

"use server"
export default async function fetchAlarms() {
    const res = await fetch("http://127.0.0.1:5000/api/device-alarms");
    if (!res.ok) throw new Error("Failed to fetch data");
    // console.log(res)
    return res.json();

}