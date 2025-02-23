// pages/overview.js

'use client';

import { useState, useEffect } from 'react';
import BentoBoxLayout from '@/components/BentoBoxLayout';
import LineChartBox from '@/components/LineChartBox';
import PieChartBox from '@/components/PieChartBox';
import { fetchDataCenters } from '@/app/actions/fetchDevices'

const OverviewPage = () => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Thermals');


    useEffect(() => {
        const savedLocation = localStorage.getItem('selectedLocation');
        const fetchLocations = async () => {
            const data = await fetchDataCenters();
            setLocations(data);
            setLoading(false);
        };

        if (savedLocation) {
            setSelectedLocation(savedLocation);
        }

        fetchLocations();
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            localStorage.setItem('selectedLocation', selectedLocation);
        }
    }, [selectedLocation]);

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col h-full min-h-screen p-4 bg-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Datacenter Performance Overview</h1>
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Selected Site:</label>
                    <select
                        className="p-2 border border-gray-300 rounded-md bg-white"
                        value={selectedLocation}
                        onChange={handleLocationChange}
                    >
                        <option value="" disabled>Select a location</option>
                        {locations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex space-x-4 mb-4">
                {['Thermals', 'Power Usage', 'Alarms'].map((tab) => (
                    <button
                        key={tab}
                        className={`p-2 rounded-md ${activeTab === tab ? 'bg-[#2A3E6F] text-white' : 'bg-white text-black'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-grow">
                <BentoBoxLayout option={{
                    selectedLocation, activeTab, selectElement: (
                        <select
                            className="p-2 border border-gray-300 rounded-md bg-white"
                            value={selectedLocation}
                            onChange={handleLocationChange}
                        >
                            <option value="" disabled>
                                Select a location
                            </option>
                            {locations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    )
                }} />
            </div>
        </div>
    );
};

export default OverviewPage;
