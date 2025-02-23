"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import fetchAlarms from "@/app/actions/fetchAlarms";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const filterOptions = [
    "categoryId",
    "alarmSummaryCategoryId",
    "source",
    "sourceState",
    "alertState",
    "location",
    "device",
    "rack",
    "circuit",
    "tenant",
    "groupPath",
    "alarmType",
    "alarmTime",
    "duration",
    "acknowledged",
    "message"
];

export default function AlarmsPage() {
    const [alarmsData, setAlarmsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        fetchAlarms().then(setAlarmsData).catch(console.error);
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

    const filteredAlarms = alarmsData.filter((alarm) => {
        const matchesSearch = Object.values(alarm).some((field) =>
            field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilters = filters.every(({ attribute, value }) => {
            return value ? alarm[attribute]?.toString().toLowerCase().includes(value.toLowerCase()) : true;
        });
        return matchesSearch && matchesFilters;
    });

    const getAttributeOptions = (attribute) => {
        const uniqueValues = [...new Set(alarmsData.map((alarm) => alarm[attribute]).filter(Boolean))];
        return uniqueValues.length <= 5 ? uniqueValues : [];
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-6xl bg-white p-8 shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Alarms</h1>

                <div className="flex gap-4 mb-6">
                    <Input
                        type="text"
                        placeholder="Search alarms..."
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
                            {filteredAlarms.map((alarm, index) => (
                                <tr key={index} className="hover:bg-gray-100 border-b">
                                    {filterOptions.map((option) => (
                                        <td key={option} className="p-3 text-sm text-gray-800">{alarm[option] || alarm[option.toLowerCase()] || 'N/A'}</td>
                                    ))}
                                </tr>
                            ))}
                            {filteredAlarms.length === 0 && (
                                <tr>
                                    <td colSpan={filterOptions.length} className="p-6 text-center text-gray-500">
                                        No alarms found.
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
