"use client";
import React from "react";
import useSWR from "swr";
import Link from "next/link";
import BlogCard from "./BlogCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const BlogList = ({ limit }) => {
    const { data, error, isLoading } = useSWR("/api/blogs", fetcher);

    if (isLoading) return <div className="text-center py-10">Loading blogs...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Failed to load blogs</div>;
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    const displayData = limit ? data.slice(0, limit) : data;

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
                    {displayData.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>

                {limit && data.length > limit && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/blog"
                            className="inline-block rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            See All Blogs
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogList;
