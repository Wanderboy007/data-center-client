"use client";

import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import dayjs from 'dayjs';

const normalizeData = (data) => {
    if (data['Return Temperature'] !== undefined) {
        return {
            Time: dayjs(data['Readable_Timestamp']).format('MMM DD, HH:mm'),
            ReturnTemp: data['Return Temperature'],
            SupplyTemp: data['Supply Air Temperature'],
            SetPoint: data['Set Point Temperature'],
            ReturnHumidity: data['Return Humidity'],
            HumidityDeviation: data['Humidity Deviation'],
            TempDiff: data['Temperature Difference'],
        };
    }
    return {};
};

const priorityColors = {
    ReturnTemp: '#f87171',
    SupplyTemp: '#82ca9d',
    SetPoint: '#60a5fa',
    ReturnHumidity: '#fbbf24',
    HumidityDeviation: '#e879f9',
    TempDiff: '#fb7185',
};

const PAHUBentoBoxLayout = ({ data }) => {
    const normalizedData = data.map(normalizeData);

    return (
        <div className="p-4 space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-md mb-4">
                <h2 className="text-2xl font-semibold mb-2">Color Code Legend</h2>
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(priorityColors).map(([key, color]) => (
                        <div key={key} className="flex items-center space-x-2">
                            <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                            <span>{key}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(priorityColors).map((key) => (
                    <Card key={key}>
                        <CardContent>
                            <h2 className="text-xl mb-2 text-center">{key}</h2>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={normalizedData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Time" angle={-45} textAnchor="end" interval={20} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey={key} stroke={priorityColors[key]} />
                                    <Brush dataKey="Time" height={30} y={350} stroke={priorityColors[key]} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PAHUBentoBoxLayout;
