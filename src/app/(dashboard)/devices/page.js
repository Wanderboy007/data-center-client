"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import fetchFilter from "@/app/actions/fetchFilter";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const filterOptions = [
    "Category",
    "DisplayName",
    "OverallStatus",
    "SiteName"
];

export default function DevicesPage() {
    const [devicesData, setDevicesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        fetchFilter().then(setDevicesData).catch(console.error);
    }, []);

    const addFilter = () => {
        setFilters([...filters, { attribute: '', value: '' }]);
    };

    const updateFilter = (index, field, value) => {
        const newFilters = [...filters];
        newFilters[index][field] = value;
        setFilters(newFilters);
    };

    const removeFilter = (index) => {
        const newFilters = filters.filter((_, i) => i !== index);
        setFilters(newFilters);
    };

    const filteredDevices = devicesData.filter((device) => {
        const matchesSearch = Object.values(device).some((field) =>
            field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilters = filters.every(({ attribute, value }) => {
            return value ? device[attribute]?.toString().toLowerCase().includes(value.toLowerCase()) : true;
        });
        return matchesSearch && matchesFilters;
    });

    const getAttributeOptions = (attribute) => {
        const uniqueValues = [...new Set(devicesData.map((device) => device[attribute]).filter(Boolean))];
        return uniqueValues.length <= 5 ? uniqueValues : [];
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Devices</h1>

                <div className="flex gap-4 mb-6">
                    <Input
                        type="text"
                        placeholder="Search devices..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={addFilter} variant="outline">
                        Add Filter
                    </Button>
                </div>

                {filters.map((filter, index) => (
                    <div key={index} className="flex gap-4 mb-4">
                        <Select onValueChange={(value) => updateFilter(index, 'attribute', value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Attribute" />
                            </SelectTrigger>
                            <SelectContent>
                                {filterOptions.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {getAttributeOptions(filter.attribute).length > 0 ? (
                            <Select onValueChange={(value) => updateFilter(index, 'value', value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Value" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getAttributeOptions(filter.attribute).map((option) => (
                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input
                                type="text"
                                placeholder="Filter Value"
                                value={filter.value}
                                onChange={(e) => updateFilter(index, 'value', e.target.value)}
                            />
                        )}

                        <Button onClick={() => removeFilter(index)} variant="destructive">
                            Remove
                        </Button>
                    </div>
                ))}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr className="bg-gray-50">
                                {filterOptions.map((option) => (
                                    <th key={option} className="p-3 text-left text-sm font-semibold text-gray-700">{option}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDevices.map((device, index) => (
                                <tr key={index} className="hover:bg-gray-100 border-b">
                                    {filterOptions.map((option) => (
                                        <td key={option} className="p-3 text-sm text-gray-800">{device[option]}</td>
                                    ))}
                                </tr>
                            ))}
                            {filteredDevices.length === 0 && (
                                <tr>
                                    <td colSpan={filterOptions.length} className="p-6 text-center text-gray-500">
                                        No devices found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
