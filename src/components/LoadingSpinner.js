import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-200 animate-pulse"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
