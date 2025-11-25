import React from "react";
import Layout from "../../components/layout/Layout";

const Fees = () => {
  const feeRecords = [
    { date: "2025-09-01", amount: 50000, status: "Paid" },
    { date: "2025-10-01", amount: 50000, status: "Pending" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Fees & Payments</h1>
        <div className="bg-white p-6 rounded shadow">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Amount (TZS)</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.map((fee, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{fee.date}</td>
                  <td className="border p-2">{fee.amount.toLocaleString()}</td>
                  <td className={`border p-2 font-semibold ${fee.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                    {fee.status}
                  </td>
                  <td className="border p-2">
                    {fee.status === "Pending" && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Fees;
