// src/pages/students/Fees.jsx
import React from "react";
import { Card } from "antd";

const Fees = ({ feesRecords }) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Fees & Payments</h2>
      {feesRecords && feesRecords.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Amount (TZS)</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {feesRecords.map((fee, idx) => (
              <tr key={idx}>
                <td className="border p-2">{fee.date}</td>
                <td className="border p-2">{fee.amount.toLocaleString()}</td>
                <td className={`border p-2 font-semibold ${fee.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                  {fee.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No fee records available yet.</p>
      )}
    </Card>
  );
};

export default Fees;
