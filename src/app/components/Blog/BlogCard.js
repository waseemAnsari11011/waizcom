import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog }) => {
    return (
        <Link href={`/blog/${blog.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Featured Image - 16:9 Aspect Ratio */}
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-6">
                {/* Category Tags */}
                <div className="mb-3 flex flex-wrap gap-2">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-800"
                            style={{ backgroundColor: '#fad17166' }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Blog Title */}
                <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900">
                    {blog.title}
                </h3>

                {/* Short Description */}
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed font-semibold text-gray-600">
                    {blog.content.replace(/<[^>]+>/g, '')}
                </p>

                {/* Published Date */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
