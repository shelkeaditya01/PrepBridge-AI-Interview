import React from 'react';

function NoDataFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl text-gray-700 mb-4">
        Oops! No Interview Feedback Records Found
      </h2>
      <img 
        src="/NoDataFound.jpg" 
        alt="No Data Found"
        className="w-138"
      />
    </div>
  );
}

export default NoDataFound;
