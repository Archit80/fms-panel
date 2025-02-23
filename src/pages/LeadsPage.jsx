import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import leadsApi from "../services/leadsApi";

const LeadsPage = () => {
    const { token } = useAuth();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) fetchLeads();
    }, [token]);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await leadsApi.getAllLeads(token);
            setLeads(response.data);
        } catch (error) {
            setError("Failed to fetch leads. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return token ? (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Leads</h1>

            {loading ? (
                <p className="text-blue-600 font-semibold animate-pulse">Fetching leads...</p>
            ) : error ? (
                <p className="text-red-500 font-semibold">{error}</p>
            ) : leads.length > 0 ? (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            {/* Table Header */}
                            <thead className="bg-gray-700 text-white text-left sticky top-0 z-10">
                                <tr>
                                    {[
                                        "ID",
                                        "Student Name",
                                        "School",
                                        "Class",
                                        "City",
                                        "Email",
                                        "Phone",
                                        "Father",
                                        "Mother",
                                        "DOB",
                                    ].map((header, index) => (
                                        <th key={index} className="px-5 py-3 font-semibold">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="text-md">
                                {leads.map((lead, index) => (
                                    <tr
                                        key={lead.id}
                                        className={`${
                                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } border-b hover:bg-blue-50 transition duration-200`}
                                    >
                                        <td className="px-5 py-3">{lead.id}</td>
                                        <td className="px-5 py-3">{lead.studentName}</td>
                                        <td className="px-5 py-3">{lead.schoolName}</td>
                                        <td className="px-5 py-3">{lead.className}</td>
                                        <td className="px-5 py-3">{lead.city}</td>
                                        <td className="px-5 py-3">{lead.email}</td>
                                        <td className="px-5 py-3">{lead.phoneNumber}</td>
                                        <td className="px-5 py-3">{lead.fatherName}</td>
                                        <td className="px-5 py-3">{lead.motherName}</td>
                                        <td className="px-5 py-3">{lead.dateOfBirth}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No leads found.</p>
            )}
        </div>
    ) : (
        <div className="flex h-screen w-full bg-gray-50 absolute left-0 justify-center items-center">
            <h1 className="text-3xl font-bold">🔐 You need to log in to access this page</h1>
        </div>
    );
};

export default LeadsPage;
