"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function CalculatorAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("settings"); // settings | history

  const fetchHistory = async () => {
    try {
        const res = await axios.get("/api/calculator/history");
        if (res.data.success) {
            setHistory(res.data.data);
        }
    } catch (error) {
        console.error("Failed to fetch history", error);
    }
  };

  useEffect(() => {
    if (activeTab === "history") {
        fetchHistory();
    }
  }, [activeTab]);

  const handleRestore = (snapshot) => {
    if (confirm("Load this version for review? Live settings won't change until you click 'Save Changes'.")) {
        // Remove _id and internal fields
        const { _id, createdAt, updatedAt, __v, ...cleanConfig } = snapshot;
        setConfig(cleanConfig);
        setActiveTab("settings");
        setMessage("Historical version loaded. Please review and click 'Save Changes' to apply.");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this history log?")) {
        try {
            const res = await axios.delete(`/api/calculator/history/${id}`);
            if (res.data.success) {
                fetchHistory(); 
                setMessage("Log deleted successfully.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to delete log.");
        }
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchConfig();
    }
  }, [status, router]);

  const fetchConfig = async () => {
    try {
      const res = await axios.get("/api/calculator/config");
      if (res.data.success) {
        setConfig(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch config", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, questionId, optionIndex, field) => {
    const newConfig = { ...config };
    const qIndex = newConfig.questions.findIndex((q) => q.id === questionId);
    if (qIndex !== -1) {
      if (field === "val") {
          newConfig.questions[qIndex].options[optionIndex].value = Number(e.target.value);
      }
      // Add label editing if needed, but primarily value editing is requested
    }
    setConfig(newConfig);
  };
  
  const handleRateChange = (e) => {
      setConfig({ ...config, [e.target.name]: Number(e.target.value) });
  }

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await axios.put("/api/calculator/config", config);
      setMessage("Configuration saved successfully!");
    } catch (error) {
      console.error("Failed to save", error);
      setMessage("Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!config) return <div className="p-10">Error loading configuration.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
            <Link href="/admin" className="mr-4 text-gray-500 hover:text-gray-700">
                <FaArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Calculator Settings</h1>
        </div>

        {message && (
          <div className={`p-4 mb-4 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}




        {/* Tabs */}
        <div className="flex border-b mb-6">
            <button
                className={`px-6 py-3 font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('settings')}
            >
                Settings
            </button>
            <button
                className={`px-6 py-3 font-medium ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('history')}
            >
                History Logs
            </button>
        </div>

        {activeTab === 'settings' ? (
           <>
             {/* Existing Settings Form */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b pb-8">
               {/* ... (Existing Inputs) ... */}
               {/* I will rely on context to indicate where this fits, or use a larger replace block if needed */}
               {/* Since 'ReplacementContent' replaces the Block, I need to include the inner content or restructure */}
               {/* To be safe, I'm replacing the INPUT SECTION with a conditional render block */}
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Day Rate (Global / $)</label>
                 <input
                   type="number"
                   name="developerDayRate"
                   value={config.developerDayRate}
                   onChange={handleRateChange}
                   className="w-full border rounded p-2"
                 />
                 <p className="text-xs text-gray-500 mt-1">
                   <strong>Includes:</strong> Dev + PM Days
                 </p>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Day Rate (India / ₹)</label>
                 <input
                   type="number"
                   name="developerDayRateINR"
                   value={config.developerDayRateINR || 0}
                   onChange={handleRateChange}
                   className="w-full border rounded p-2"
                 />
                 <p className="text-xs text-red-500 mt-1">
                   <strong>Excludes:</strong> PM Factor (Dev Days Only)
                 </p>
               </div>
     
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">PM Factor (%)</label>
                 <input
                   type="number"
                   name="pmPercentage"
                   value={config.pmPercentage}
                   onChange={handleRateChange}
                   className="w-full border rounded p-2"
                 />
                 <p className="text-xs text-blue-600 mt-1">
                   Markup applied to <strong>Global ($)</strong> rates only.
                 </p>
               </div>
             </div>
     
             <div className="space-y-8">
               <h2 className="text-xl font-semibold text-gray-800">Question Values</h2>
               {config.questions.map((q) => (
                 <div key={q.id} className="border p-4 rounded bg-gray-50">
                   <h3 className="font-medium text-lg mb-2">{q.label}</h3>
                   <p className="text-sm text-gray-500 mb-4 capitalize">Type: {q.type.replace("_", " ")}</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {q.options.map((opt, idx) => (
                       <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border">
                         <span className="text-gray-700 font-medium">{opt.label}</span>
                         <div className="flex items-center">
                             <span className="text-gray-400 mr-2 text-sm">
                                 {q.type === 'percentage' ? '%' : 'Days'}:
                             </span>
                             <input
                             type="number"
                             value={opt.value}
                             onChange={(e) => handleChange(e, q.id, idx, "val")}
                             className="w-20 border rounded p-1 text-right"
                             />
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
     
             <div className="mt-8 flex justify-end sticky bottom-0 bg-white p-4 border-t">
               <button
                 onClick={handleSave}
                 disabled={saving}
                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
               >
                 {saving ? "Saving..." : "Save Changes"}
               </button>
             </div>
           </>
        ) : (
            // HISTORY TAB
            <div className="space-y-4">
                {history.length === 0 ? (
                    <p className="text-gray-500 italic">No history available yet.</p>
                ) : (
                    history.map((item) => (
                        <div key={item._id} className="border rounded p-4 bg-white flex justify-between items-center hover:bg-gray-50">
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {new Date(item.createdAt).toLocaleString()}
                                </p>
                                <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-x-6 gap-y-2">
                                    <span>Global Rate: <strong>${item.configSnapshot.developerDayRate}</strong></span>
                                    <span>India Rate: <strong>₹{item.configSnapshot.developerDayRateINR || 15000}</strong></span>
                                    <span>PM: <strong>{item.configSnapshot.pmPercentage}%</strong></span>
                                    
                                    {/* Stats */}
                                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                        Leads: <strong>{item.stats?.leads || 0}</strong>
                                    </span>
                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                        Bookings: <strong>{item.stats?.bookings || 0}</strong>
                                    </span>
                                    <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                                        Conv: <strong>{item.stats?.conversion || 0}%</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleRestore(item.configSnapshot)}
                                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm font-medium"
                                >
                                    Restore
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}
      </div>
    </div>
  );
}
