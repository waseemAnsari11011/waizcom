"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Dashboard = () => {
    const session = useSession();
    const router = useRouter();
    const { data, mutate, isLoading } = useSWR("/api/blogs", fetcher);

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [session.status, router]);

    const handleDelete = async (slug) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await fetch(`/api/blogs/${slug}`, {
                method: "DELETE",
            });
            mutate();
        } catch (err) {
            console.log(err);
        }
    };

    if (session.status === "loading" || isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    if (session.status === "unauthenticated") {
        return <div className="p-8">Redirecting to login...</div>;
    }

    // Organize data into Hubs and Spokes
    const hubs = data?.filter(blog => blog.is_pillar_page) || [];
    const allSpokes = data?.filter(blog => !blog.is_pillar_page) || [];
    
    // Group spokes by hub
    const hubsWithSpokes = hubs.map(hub => ({
        ...hub,
        spokes: allSpokes.filter(spoke => spoke.parent_hub_id === hub._id)
    }));

    // Find orphan spokes (no parent hub or parent hub not found)
    const orphanSpokes = allSpokes.filter(spoke => !spoke.parent_hub_id || !hubs.find(h => h._id === spoke.parent_hub_id));

    const BlogCard = ({ blog, isHub = false }) => (
        <div className={`overflow-hidden rounded-lg bg-white shadow-md ${isHub ? 'border-2 border-blue-500' : ''}`}>
            <div className="h-48 w-full bg-gray-200 relative">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                />
                {isHub && <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">HUB</span>}
            </div>
            <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold text-gray-800 line-clamp-2">
                    {blog.title}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between">
                    <Link
                        href={`/blog/${blog.slug}`}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                    >
                        View
                    </Link>
                    <div className="flex gap-4">
                        <Link
                            href={`/admin/edit/${blog.slug}`}
                            className="text-green-600 hover:underline"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(blog.slug)}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (session.status === "authenticated") {
        return (
            <div className="min-h-screen bg-gray-100 p-8 pt-32">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <div className="flex gap-4">
                            <Link
                                href="/admin/create"
                                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            >
                                Create New Blog
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {Array.isArray(data) && data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="mb-4 text-xl text-gray-500">No blogs found yet.</p>
                            <Link
                                href="/admin/create"
                                className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                            >
                                Create Your First Blog
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Hubs Sections */}
                            {hubsWithSpokes.map((hub) => (
                                <div key={hub._id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                            <span className="text-blue-600">Hub:</span> {hub.title}
                                        </h2>
                                        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            <BlogCard blog={hub} isHub={true} />
                                        </div>
                                    </div>
                                    
                                    {hub.spokes.length > 0 && (
                                        <div className="ml-8 border-l-2 border-gray-300 pl-8">
                                            <h3 className="text-lg font-semibold text-gray-600 mb-4">Spokes (Cluster Content)</h3>
                                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                                {hub.spokes.map((spoke) => (
                                                    <BlogCard key={spoke._id} blog={spoke} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Orphan Blogs Section */}
                            {orphanSpokes.length > 0 && (
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Other Blogs (No Hub Assigned)</h2>
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {orphanSpokes.map((blog) => (
                                            <BlogCard key={blog._id} blog={blog} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default Dashboard;
