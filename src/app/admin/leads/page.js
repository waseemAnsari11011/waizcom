"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const callStatusOptions = [
        { value: "Select", label: "📌 Select" },
        { value: "Connected", label: "📞 Connected" },
        { value: "Not Reachable", label: "🚫 Not Reachable" },
        { value: "Switched Off", label: "📱 Switched Off" },
        { value: "Did Not Pick", label: "🔕 Did Not Pick" },
        { value: "Call Back Later", label: "🔁 Call Back Later" },
        { value: "Wrong Number", label: "❌ Wrong Number" },
        { value: "Maybe Later", label: "🤔 Maybe Later" },
    ];

    const leadStatusOptions = [
        { value: "Select", label: "📌 Select" },
        { value: "Interested", label: "💬 Interested" },
        { value: "Not Interested", label: "💤 Not Interested" },
        { value: "Deal Closed", label: "✅ Deal Closed" },
    ];

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/leads");
            setLeads(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching leads:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateLead = async (id, field, value) => {
        try {
            await axios.put(`/api/leads/${id}`, { [field]: value });
            // Optimistic update
            setLeads((prev) =>
                prev.map((lead) => (lead._id === id ? { ...lead, [field]: value } : lead))
            );
        } catch (error) {
            console.error("Error updating lead:", error);
            alert("Failed to update lead");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading leads...</div>;

    return (
        <div className="p-8 max-w-[1400px] mx-auto">
            <h1 className="text-3xl font-bold mb-6">Leads Management</h1>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500" style={{ whiteSpace: 'nowrap' }}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Inquiry Date</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Company</th>
                            <th className="px-6 py-3">Call Status</th>
                            <th className="px-6 py-3">Lead Status</th>
                            <th className="px-6 py-3">Follow-up Date</th>
                            <th className="px-6 py-3">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead._id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {format(new Date(lead.createdAt), "dd MMM yyyy, hh:mm a")}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {lead.name}
                                </td>
                                <td className="px-6 py-4">{lead.phone}</td>
                                <td className="px-6 py-4">{lead.email}</td>
                                <td className="px-6 py-4">{lead.company}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={lead.callStatus}
                                        onChange={(e) =>
                                            updateLead(lead._id, "callStatus", e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        style={{ width: '170px' }}
                                    >
                                        {callStatusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={lead.leadStatus}
                                        onChange={(e) =>
                                            updateLead(lead._id, "leadStatus", e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        style={{ width: '170px' }}
                                    >
                                        {leadStatusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <input
                                        type="date"
                                        value={
                                            lead.followUpDate
                                                ? new Date(lead.followUpDate).toISOString().split("T")[0]
                                                : ""
                                        }
                                        onChange={(e) =>
                                            updateLead(lead._id, "followUpDate", e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                </td>
                                <td className="px-6 py-4 max-w-xs truncate" style={{ width: '100px', overflowX: 'auto' }} title={lead.message}>
                                    {lead.message}
                                </td>
                            </tr>
                        ))}
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan="9" className="px-6 py-4 text-center">
                                    No leads found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeadsPage;
