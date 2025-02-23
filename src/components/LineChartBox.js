"use client";

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const LineChartBox = ({ title, location, data = [] }) => {
    const [realData, setRealData] = useState([{ name: 'Initial', value: 50 }]);
    const [predictedData, setPredictedData] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            // Use provided data if available
            setRealData(data);
            setPredictedData(data);
        } else {
            // Fallback to simulated data
            const interval = setInterval(() => {
                setRealData((prevData) => {
                    const newData = [
                        ...prevData.slice(-19),
                        {
                            name: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                            value: Math.floor(Math.random() * 100)
                        }
                    ];

                    const additionalPredictions = 5;
                    const newPredictedData = [...newData];
                    let lastRealValue = newData[newData.length - 1]?.value || 50;

                    for (let i = 1; i <= additionalPredictions; i++) {
                        lastRealValue += (Math.random() - 0.5) * 20;
                        newPredictedData.push({
                            name: `+${i}s`,
                            value: Math.max(0, Math.floor(lastRealValue))
                        });
                    }

                    setPredictedData(newPredictedData);
                    return newData;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [data]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{`${title} ${location}`}</h2>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={predictedData}
                        margin={{ top: 40, right: 30, left: 0, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            angle={-45}
                            textAnchor="end"
                            interval={4}
                            minTickGap={10}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" height={30} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            data={realData}
                            stroke="#8884d8"
                            strokeWidth={2}
                            isAnimationActive={false}
                            name="Real Data"
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            data={predictedData}
                            stroke="#ff4d4f"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            isAnimationActive={false}
                            name="Predicted Data"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartBox;
