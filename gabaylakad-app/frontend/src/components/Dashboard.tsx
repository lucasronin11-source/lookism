import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4">Welcome to your dashboard! Here you can monitor and manage your activities.</p>
            {/* Additional user-specific information can be displayed here */}
        </div>
    );
};

export default Dashboard;