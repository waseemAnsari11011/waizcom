"use client";
import React from "react";
import useSWR from "swr";
import BlogCard from "./BlogCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const BlogList = () => {
    const { data, error, isLoading } = useSWR("/api/blogs", fetcher);

    if (isLoading) return <div className="text-center py-10">Loading blogs...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Failed to load blogs</div>;
    if (!data || data.length === 0) return null;

    return (
        <section className="bg-white py-20" id="blog">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-left">
                    <h2 className="text-3xl font-extrabold uppercase tracking-widest text-gray-900 md:text-4xl font-sans">
                        What’s New in Our Blog?
                    </h2>
                    {/* <div className="mt-2 mx-auto h-1 w-24 bg-blue-600 rounded-full"></div> */}
                </div>
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogList;
