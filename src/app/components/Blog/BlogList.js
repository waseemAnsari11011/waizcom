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
        <section className="bg-gray-50 py-16" id="blog">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                        Latest Insights
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Stay updated with our latest news and tech trends.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogList;
