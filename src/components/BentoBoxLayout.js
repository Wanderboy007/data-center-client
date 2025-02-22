'use client';

import LineChartBox from './LineChartBox';
import PieChartBox from './PieChartBox';


const BentoBoxLayout = ({ option }) => {
    console.log(option?.selectedLocation, option?.activeTab);

    const renderGrid = () => {
        if (!option?.selectedLocation) {
            return (
                <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-100">
                    <div className="p-10 max-w-md bg-white shadow-lg rounded-2xl text-center">
                        <div className="mb-6">
                            <svg className="w-32 h-32 mx-auto mb-4 text-[#2A3E6F]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 4.42 4 8 7 11 3-3 7-6.58 7-11 0-3.87-3.13-7-7-7z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold mb-3 text-gray-800">Please Select a Location</h1>
                        <p className="text-gray-500 mb-6">Choose a location to proceed dashboard.</p>
                        {option?.selectElement}
                    </div>
                </div>
            );
        }

        switch (option?.activeTab) {
            case 'Thermals':
                return (
                    <div className="grid grid-cols-3 gap-4 p-4">
                        <div className="col-span-2 row-span-2 h-full">
                            <LineChartBox title="Thermal Performance" location={option.selectedLocation} />
                        </div>
                        <div className="row-span-2 h-full">
                            <PieChartBox title="Temperature Distribution" location={option.selectedLocation} />
                        </div>
                        {/* <div className="col-span-3">
                            <DataCard title="Average Temperature" value="25°C" />
                        </div> */}
                    </div>
                );
            case 'Power Usage':
                return (
                    <div className="grid grid-cols-3 gap-4 p-4">
                        <div className="col-span-2 row-span-2 h-full">
                            <LineChartBox title="Power Usage Efficiency" location={option.selectedLocation} />
                        </div>
                        <div className="row-span-2 h-full">
                            <PieChartBox title="Power Consumption Breakdown" location={option.selectedLocation} />
                        </div>
                        {/* <div className="col-span-3">
                            <DataCard title="Total Power Consumption" value="150 kW" />
                        </div> */}
                    </div>
                );
            case 'Alarms':
                return (
                    <div className="grid grid-cols-3 gap-4 p-4">
                        <div className="col-span-2 row-span-2 h-full">
                            <LineChartBox title="Alarm Frequency" location={option.selectedLocation} />
                        </div>
                        <div className="row-span-2 h-full">
                            <PieChartBox title="Alarm Severity Distribution" location={option.selectedLocation} />
                        </div>
                        {/* <div className="col-span-3">
                            <DataCard title="Total Active Alarms" value="12" />
                        </div> */}
                    </div>
                );
            default:
                return <h1>Not Searched Yet</h1>;
        }
    };

    return renderGrid();
};

export default BentoBoxLayout;
