"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    FaHome, 
    FaUserFriends, 
    FaCalculator, 
    FaBlog, 
    FaProjectDiagram,
    FaSignOutAlt, 
    FaCog
} from "react-icons/fa";
import { signOut } from "next-auth/react";

const AdminSidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", icon: <FaHome />, path: "/admin" },
        { name: "Leads", icon: <FaUserFriends />, path: "/admin/leads" },
        { name: "All Blogs", icon: <FaBlog />, path: "/admin/blogs" },
        { name: "Create Blog", icon: <FaBlog />, path: "/admin/create" }, 
        // Assuming projects page exists or will exist, placeholder for now or checking existing
        // { name: "Projects", icon: <FaProjectDiagram />, path: "/admin/projects" }, 
        { name: "Calculator Settings", icon: <FaCalculator />, path: "/admin/calculator" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white shadow-xl z-50 flex flex-col">
            <div className="p-6 border-b border-slate-700">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Ecarts Admin
                </h2>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors"
                >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
