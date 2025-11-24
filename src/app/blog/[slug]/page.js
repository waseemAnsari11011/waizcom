import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getBlog(slug) {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export async function generateMetadata({ params }) {
    const blog = await getBlog(params.slug);
    if (!blog) return { title: "Blog Not Found" };
    console.log('=', blog)
    return {
        title: blog.title,
        description: blog.content.substring(0, 160).replace(/<[^>]+>/g, ''),
        keywords: blog.tags
    };
}

const processContent = (content) => {
    const headings = [];
    const processedContent = content.replace(/<h([1-3])>(.*?)<\/h\1>/g, (match, level, text) => {
        const cleanText = text.replace(/<[^>]+>/g, '');
        const id = cleanText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        headings.push({ id, text: cleanText, level: parseInt(level) });
        return `<h${level} id="${id}">${text}</h${level}>`;
    });
    return { processedContent, headings };
};

const TableOfContents = ({ headings }) => {
    if (headings.length === 0) return null;

    return (
        <div className="sticky top-24 hidden lg:block">
            <h4 className="mb-4 text-lg font-bold uppercase tracking-widest text-gray-900">
                Table of Contents
            </h4>
            <nav className="flex flex-col space-y-3 border-l border-gray-200 pl-4">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`text-base transition-colors hover:text-blue-600 ${heading.level === 3 ? "pl-4 text-gray-500" : "text-gray-600 font-medium"
                            }`}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
};

const BlogPage = async ({ params }) => {
    const blog = await getBlog(params.slug);

    if (!blog) {
        notFound();
    }

    const { processedContent, headings } = processContent(blog.content);

    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="mb-8">
                            <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                            <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
                                {blog.title}
                            </h1>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div
                            className="prose prose-lg max-w-none text-gray-700 prose-headings:scroll-mt-32 prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-blue-600"
                            dangerouslySetInnerHTML={{ __html: processedContent }}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <TableOfContents headings={headings} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
