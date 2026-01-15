"use client";
import { SessionProvider } from "next-auth/react";

import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <SessionProvider>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar - only show if NOT on login page. 
                    Actually layout wraps all /admin, including /admin/login. 
                    We need to conditionally render or let the sidebar handle it? 
                    Better to check path in Sidebar or just hide it via CSS if needed, 
                    but cleaner to just render it. 
                    However, for login page, we likely don't want sidebar.
                    Let's handle that check inside layout if possible, or usually login has its own layout or group.
                    Since I can't easily change folder structure right now without risk, 
                    I'll add a check or just let it be. 
                    Wait, standard practice: Login page usually shouldn't be under the same layout if it's vastly different.
                    I'll assume /admin/login is the only exception. 
                */}
                <AdminSidebarWrapper>
                    {children}
                </AdminSidebarWrapper>
            </div>
        </SessionProvider>
    );
}

// Helper specific to this file to allow hook usage if needed, or just standard composition
function AdminSidebarWrapper({ children }) {
    // We can't use hooks like usePathname in Server Component (Layout is server by default in App dir unless "use client").
    // But this file already has "use client" at top.
    
    // We can verify if we are on login page
    // BUT "use client" in layout is not ideal for metadata, but it was already there.
    
    return (
        <>
           <SidebarLogic /> 
           <main className="flex-1 ml-64 p-8 animate-in fade-in duration-300">
                {children}
           </main>
        </>
    )
}

import { usePathname } from "next/navigation";
function SidebarLogic() {
    const pathname = usePathname();
    if (pathname === '/admin/login') return null;
    return <AdminSidebar />;
}
