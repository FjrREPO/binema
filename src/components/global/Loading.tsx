import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="absolute top-0 left-0animate-pulse w-screen h-screen z-50 bg-black overflow-hidden"/>
    );
};

export default Loading;