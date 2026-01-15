"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBlog, FaUserFriends, FaCalculator } from "react-icons/fa";

const Dashboard = () => {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [session.status, router]);

    if (session.status === "loading") {
        return <div className="p-8">Loading...</div>;
    }

    if (session.status === "authenticated") {
        return (
            <div className="min-h-screen bg-gray-50 p-8 pt-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, {session.data.user?.name || "Admin"}</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Quick Stats / Navigation Cards */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                    <FaBlog size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Blogs</h3>
                            </div>
                            <p className="text-gray-600 mb-4">Manage your content hubs and articles.</p>
                            <Link href="/admin/blogs" className="text-blue-600 font-medium hover:underline">
                                View All Blogs &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                    <FaUserFriends size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Leads</h3>
                            </div>
                            <p className="text-gray-600 mb-4">View and manage form submissions.</p>
                            <Link href="/admin/leads" className="text-purple-600 font-medium hover:underline">
                                View Leads &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                                    <FaCalculator size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">Calculator</h3>
                            </div>
                            <p className="text-gray-600 mb-4">Update cost rates and settings.</p>
                            <Link href="/admin/calculator" className="text-green-600 font-medium hover:underline">
                                Configure &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default Dashboard;
