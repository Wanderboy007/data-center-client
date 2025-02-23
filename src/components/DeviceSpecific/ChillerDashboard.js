"use client";

import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import dayjs from 'dayjs';

const normalizeData = (data) => {
    if (data['WATER IN TEMP'] !== undefined) {
        return {
            Time: dayjs(data['Readable_Timestamp']).format('MMM DD, HH:mm'),
            WaterInTemp: data['WATER IN TEMP'],
            WaterOutTemp: data['WATER OUT TEMP'],
            SetPoint: data['SET POINT'],
            TempDiff: data['Temperature Difference'],
            SetpointDeviation: data['Setpoint Deviation'],
            RollingMean12H: data['Rolling_Mean_12H'],
            RollingMean24H: data['Rolling_Mean_24H'],
            RollingMean6H: data['Rolling_Mean_6H'],
        };
    }
    return {};
};

const priorityColors = {
    WaterInTemp: '#f87171', // High Priority - Red
    WaterOutTemp: '#82ca9d', // Medium Priority - Green
    SetPoint: '#60a5fa', // Low Priority - Blue
    TempDiff: '#fbbf24', // Medium Priority - Yellow
    SetpointDeviation: '#e879f9', // Low Priority - Purple
    RollingMean12H: '#34d399', // Medium Priority - Teal
    RollingMean24H: '#a78bfa', // Low Priority - Violet
    RollingMean6H: '#fb7185', // High Priority - Pink
};

const ChillerBentoBoxLayout = ({ data }) => {
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
                                    <Line type="monotone" dataKey={key} dot={false} stroke={priorityColors[key]} />
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

export default ChillerBentoBoxLayout;
