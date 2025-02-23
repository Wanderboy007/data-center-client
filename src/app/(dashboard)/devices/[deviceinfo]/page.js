"use client";

import React, { useEffect, useState } from "react";
import { fetchSingleDevice } from "@/app/actions/fetchSingleDevice";
import PAHUBentoBoxLayout from "@/components/DeviceSpecific/PAHUBentoBoxLayout";
import ChillerDashboard from "@/components/DeviceSpecific/ChillerDashboard";
import CRAC_AHUDashboard from "@/components/DeviceSpecific/CRAC_AHUDashboard";
import CSUDashboard from "@/components/DeviceSpecific/CSUDashboard";

// Component map for dynamic rendering
const componentMap = {
    "CRAC_PAHU": PAHUBentoBoxLayout,
    "Chiller": ChillerDashboard,
    "CRAC_AHU": CRAC_AHUDashboard,
    "CSU": CSUDashboard,
};

const DeviceDashboard = ({ params }) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [deviceType, setDeviceType] = useState("");

    async function getData() {
        const { deviceinfo } = await params;
        const decodedDeviceInfo = decodeURIComponent(deviceinfo);
        const fetchedData = await fetchSingleDevice(decodedDeviceInfo, page);

        // Get the first device type key (e.g., "CRAC_PAHU", "Chiller")
        const firstDeviceKey = Object.keys(fetchedData)?.[0] || "";
        const firstData = Object.values(fetchedData)?.[0] || [];

        setDeviceType(firstDeviceKey); // Store the device type
        setData(firstData); // Store the device data
        console.log(firstDeviceKey, firstData);
    }

    useEffect(() => {
        getData();
    }, [page]);

    // Determine the correct component based on the device type
    const ComponentToRender = componentMap[deviceType] || (() => <p>Unknown Device Type</p>);

    return (
        <div>
            <ComponentToRender data={data} />
        </div>
    );
};

export default DeviceDashboard;
