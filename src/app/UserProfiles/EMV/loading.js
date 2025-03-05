import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="p-2 border rounded-md bg-white animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/316 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

const LoadingSkeletonss = () => {
  return (
    <div className="w-full bg-white  grid md:grid-cols-4 grid-cols-1 gap-5">
      {Array.from({ length: 20 }).map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeletonss;
