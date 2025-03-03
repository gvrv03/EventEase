import React from "react";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-4">
      <div className="h-5 bg-gray-300 rounded w-24"></div>
    </td>
    <td className="p-4">
      <div className="h-5 bg-gray-300 rounded w-32"></div>
    </td>
    <td className="p-4">
      <div className="h-5 bg-gray-300 rounded w-20"></div>
    </td>
    <td className="p-4">
      <div className="h-5 bg-gray-300 rounded w-28"></div>
    </td>
  </tr>
);

const LoadingSkeleton = ({ rows = 10 }) => {
  return (
    <div className="overflow-x-scroll w-full bg-white border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="p-4 text-left text-gray-500">Name</th>
            <th className="p-4 text-left text-gray-500">User ID</th>
            <th className="p-4 text-left text-gray-500">Phone</th>
            <th className="p-4 text-left text-gray-500">Verification</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingSkeleton;
