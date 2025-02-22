const DataCard = ({ title }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
            <h2 className="text-lg font-semibold">{title}</h2>
        </div>
    );
};

export default DataCard;
