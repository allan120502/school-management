import React from "react";

const Attendance = () => {
  const attendanceRecords = [
    { date: "2025-11-01", status: "Present" },
    { date: "2025-11-02", status: "Absent" },
    { date: "2025-11-03", status: "Present" },
    { date: "2025-11-04", status: "Present" },
  ];

  return (
    
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Attendance</h1>
        <div className="bg-white p-6 rounded shadow">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((rec, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{rec.date}</td>
                  <td className={`border p-2 font-semibold ${rec.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                    {rec.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Attendance;
