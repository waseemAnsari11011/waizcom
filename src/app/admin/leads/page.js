"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FaPlus, FaTimes } from "react-icons/fa";

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({
        createdAt: "",
        name: "",
        phone: "",
        email: "",
        company: "",
        message: "",
    });

    console.log(leads)
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLead((prev) => ({ ...prev, [name]: value }));
    };

    const [isFollowupModalOpen, setIsFollowupModalOpen] = useState(false);
    const [selectedLeadForFollowup, setSelectedLeadForFollowup] = useState(null);
    const [followupData, setFollowupData] = useState({
        followupCount: 0,
        followupDescription: "",
    });

    const openFollowupModal = async (lead) => {
        setSelectedLeadForFollowup(lead);
        // Initialize with current local data while fetching
        setFollowupData({
            followupCount: lead.followupCount || 0,
            followupDescription: lead.followupDescription || "",
        });
        setIsFollowupModalOpen(true);

        try {
            // Fetch latest data for this specific lead
            const response = await axios.get(`/api/leads/${lead._id}`);
            const freshLead = response.data;
            setFollowupData({
                followupCount: freshLead.followupCount || 0,
                followupDescription: freshLead.followupDescription || "",
            });
            // Update local state to reflect fresh data
            setLeads((prev) =>
                prev.map((l) =>
                    l._id === freshLead._id ? freshLead : l
                )
            );
        } catch (error) {
            console.error("Error fetching latest lead details:", error);
        }
    };

    const handleUpdateFollowup = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/leads/${selectedLeadForFollowup._id}`, followupData);
            // Update local state directly to avoid full refetch if not needed, 
            // but fetching full list is safer for consistency.
            // Let's stick to full refresh for now as per previous fix, or optimize.
            // The user wanted "preview" (previous) data to show up.
            // The previous fix (fetchData) works for *after* update.
            // This new fix (GET /id) works for *before* update (on open).

            // We can update local state immediately for UI responsiveness
            setLeads((prev) =>
                prev.map((lead) =>
                    lead._id === selectedLeadForFollowup._id
                        ? { ...lead, ...followupData }
                        : lead
                )
            );

            setIsFollowupModalOpen(false);
            alert("Follow-up status updated successfully!");
        } catch (error) {
            console.error("Error updating follow-up:", error);
            alert("Failed to update follow-up status");
        }
    };

    const handleAddLead = async (e) => {
        e.preventDefault();
        if (!newLead.phone || !newLead.email || !newLead.message) {
            alert("Please fill in all required fields (Phone, Email, Message)");
            return;
        }

        const payload = { ...newLead };
        if (!payload.createdAt) {
            delete payload.createdAt;
        }

        try {
            const response = await axios.post("/api/leads", payload);
            setLeads((prev) => [response.data, ...prev]);
            setIsModalOpen(false);
            setNewLead({
                createdAt: "",
                name: "",
                phone: "",
                email: "",
                company: "",
                message: "",
            });
            alert("Lead added successfully!");
        } catch (error) {
            console.error("Error adding lead:", error);
            alert("Failed to add lead");
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
        <div className="p-8 max-w-[1400px] mx-auto" style={{ marginTop: '100px' }}>
            <div className="flex justify-between items-center flex-wrap gap-2.5 mb-6">
                <h1 className="text-3xl font-bold">Leads Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <FaPlus /> Add Lead
                </button>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500" style={{ whiteSpace: 'nowrap' }}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Inquiry Date</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Company</th>
                            <th className="px-6 py-3">Country</th>
                            <th className="px-6 py-3">Source</th>
                            <th className="px-6 py-3">Call Status</th>
                            <th className="px-6 py-3">Lead Status</th>
                            <th className="px-6 py-3">Follow-up Date</th>
                            <th className="px-6 py-3">Follow-up Status</th>
                            <th className="px-6 py-3">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead._id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {new Date(lead.createdAt).toLocaleString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {lead.name}
                                </td>
                                <td className="px-6 py-4">{lead.phone}</td>
                                <td className="px-6 py-4">{lead.email}</td>
                                <td className="px-6 py-4">{lead.company}</td>
                                <td className="px-6 py-4">{lead.country || '-'}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit ${lead.source === "App Cost Calculator" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}>
                                            {lead.source || "Website"}
                                        </span>
                                        {lead.source === "App Cost Calculator" && lead.calculatorData && (
                                            <span className="text-xs text-gray-500 mt-1">
                                                {lead.calculatorData.currency} {lead.calculatorData.totalCost?.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </td>
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
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => openFollowupModal(lead)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs"
                                    >
                                        Check
                                    </button>
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

            {/* Add Lead Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: '111' }}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200" style={{ height: '90vh', overflowY: 'auto' }}>
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">Add New Lead</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddLead} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Inquiry Date
                                </label>
                                <input
                                    type="datetime-local"
                                    name="createdAt"
                                    value={newLead.createdAt}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-1">Leave empty for today</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newLead.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={newLead.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newLead.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={newLead.company}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Company Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={newLead.message}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter lead details or message..."
                                ></textarea>
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
                                >
                                    Save Lead
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Follow-up Modal */}
            {isFollowupModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: '200' }}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-sm font-bold text-gray-800">Update Follow-up Status</h2>
                            <button
                                onClick={() => setIsFollowupModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateFollowup} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    How many times follow-up taken?
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={followupData.followupCount}
                                    onChange={(e) =>
                                        setFollowupData({
                                            ...followupData,
                                            followupCount: e.target.value === "" ? "" : parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description of follow-up
                                </label>
                                <textarea
                                    value={followupData.followupDescription}
                                    onChange={(e) =>
                                        setFollowupData({
                                            ...followupData,
                                            followupDescription: e.target.value,
                                        })
                                    }
                                    rows="4"
                                    className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter follow-up details..."
                                ></textarea>
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
                                >
                                    Update Status
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadsPage;
