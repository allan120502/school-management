import React from "react";

const Application = () => {
  return (
    
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Online Application</h1>
        <p className="text-gray-600">
          Submit or track your application to the school.
        </p>
        <div className="bg-white p-6 rounded shadow max-w-xl">
          <form className="space-y-4">
            <div>
              <label className="block font-semibold">Full Name</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="John Doe" />
            </div>
            <div>
              <label className="block font-semibold">Date of Birth</label>
              <input type="date" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-semibold">Class Applying For</label>
              <select className="w-full border p-2 rounded">
                <option>Form 1</option>
                <option>Form 2</option>
                <option>Form 3</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Submit Application
            </button>
          </form>
        </div>
      </div>
  );
};

export default Application;
