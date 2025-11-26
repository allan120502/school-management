import React from "react";

const StudentProfile = () => {
  return (
  
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Gender:</strong> Male</p>
            <p><strong>Date of Birth:</strong> 2008-05-12</p>
            <p><strong>Class:</strong> Form 2</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Phone:</strong> +255 712 345 678</p>
            <p><strong>Address:</strong> Dar es Salaam, Tanzania</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
  );
};

export default StudentProfile;
