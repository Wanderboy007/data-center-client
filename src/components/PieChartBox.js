'use client';

import { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#4caf50', '#f44336']; // Green for IT, Red for overhead

const PUEChartBox = ({ title = "Power Usage Effectiveness" }) => {
    const [pue, setPue] = useState(1.5); // Initial PUE value

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate PUE changes between 1.1 and 2.5
            setPue(parseFloat((Math.random() * 1.4 + 1.1).toFixed(2)));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Memoize data to avoid unnecessary recalculations
    const data = useMemo(() => [
        { name: 'IT Equipment Energy', value: 1 },
        { name: 'Facility Overhead', value: pue - 1 },
    ], [pue]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </h2>
            <div className="relative h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            fill="#82ca9d"
                            isAnimationActive={false}
                            label={false}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${entry.name}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PUEChartBox;
