import React from "react";
import Layout from "../../components/layout/Layout";

const AcademicProgress = () => {
  const subjects = [
    { subject: "Mathematics", score: 85, grade: "A" },
    { subject: "English", score: 78, grade: "B+" },
    { subject: "Science", score: 92, grade: "A+" },
    { subject: "History", score: 70, grade: "B" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Academic Progress</h1>
        <div className="bg-white p-6 rounded shadow overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Score</th>
                <th className="border p-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{subj.subject}</td>
                  <td className="border p-2">{subj.score}</td>
                  <td className="border p-2 font-semibold">{subj.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AcademicProgress;
