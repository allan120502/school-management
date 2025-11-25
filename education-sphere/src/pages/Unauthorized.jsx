import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-red-600">
          Access Denied
        </h1>
        <p className="mb-4 text-gray-700">
          You don’t have permission to view this page.
        </p>
        <Link to="/" className="text-blue-500 underline">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
