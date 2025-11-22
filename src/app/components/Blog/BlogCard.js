import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog }) => {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="relative h-48 w-full">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-6">
                <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <div className="flex gap-1">
                        {blog.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="rounded bg-gray-200 px-2 py-1">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800 line-clamp-2">
                    {blog.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {blog.content.replace(/<[^>]+>/g, '')}
                </p>
                <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-block font-semibold text-blue-600 hover:text-blue-800"
                >
                    Read More &rarr;
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
