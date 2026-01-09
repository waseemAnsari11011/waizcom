import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import connect from "@/lib/db";
import Blog from "@/models/Blog";
import Link from "next/link";
import TableOfContents from "./TableOfContents";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import BlogCard from "@/app/components/Blog/BlogCard";
import BlogContent from "@/app/components/Blog/BlogContent";
import { generateArticleSchema } from "@/utils/schemaGenerator";


// blog page upade LOREM IPSUM



async function getBlog(slug) {
    try {
        await connect();
        const blog = await Blog.findOne({ slug }).populate('parent_hub_id', 'title slug').lean();

        let spokes = [];
        if (blog && blog.is_pillar_page) {
            spokes = await Blog.find({ parent_hub_id: blog._id, isPublished: true }).select('title slug image tags createdAt content').lean();
        }

        return { blog, spokes };
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = await getBlog(slug);
    if (!data || !data.blog) return { title: "Blog Not Found" };
    const { blog } = data;

    const plainTextContent = blog.content.replace(/<[^>]+>/g, '');
    const description = plainTextContent.substring(0, 160).trim();

    return {
        title: blog.title,
        description: description,
        keywords: blog.keywords && blog.keywords.length > 0 ? blog.keywords : blog.tags,
        openGraph: {
            title: blog.title,
            description: description,
            type: 'article',
            url: `/blog/${blog.slug}`,
            images: [
                {
                    url: blog.image,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: description,
            images: [blog.image],
        },
        alternates: {
            canonical: `/blog/${blog.slug}`,
        },
    };
}

const processContent = (content) => {
    const headings = [];
    const uniqueIds = new Set();

    const processedContent = content.replace(/<h([1-3])>(.*?)<\/h\1>/g, (match, level, text) => {
        const cleanText = text.replace(/<[^>]+>/g, '');
        let id = cleanText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        // Ensure ID is unique
        if (uniqueIds.has(id)) {
            let counter = 1;
            let newId = `${id}-${counter}`;
            while (uniqueIds.has(newId)) {
                counter++;
                newId = `${id}-${counter}`;
            }
            id = newId;
        }

        uniqueIds.add(id);
        headings.push({ id, text: cleanText, level: parseInt(level) });
        return `<h${level} id="${id}">${text}</h${level}>`;
    });
    return { processedContent, headings };
};

const BlogPage = async ({ params }) => {
    const { slug } = await params;
    const data = await getBlog(slug);

    if (!data || !data.blog) {
        notFound();
    }

    const { blog, spokes } = data;
    const { processedContent, headings } = processContent(blog.content);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: blog.title, href: `/blog/${blog.slug}` },
    ];

    const articleSchema = generateArticleSchema({
        title: blog.title,
        image: blog.image,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        authorName: "ecarts Team",
        description: blog.content.substring(0, 160).replace(/<[^>]+>/g, '')
    });

    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <div className="container mx-auto px-4 max-w-7xl">
                <Breadcrumbs items={breadcrumbItems} />
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
                                {blog.tags.slice(0, 3).map((tag, index) => (
                                    <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Series Link (Hub and Spoke) */}
                        {blog.parent_hub_id && (
                            <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
                                <p className="text-gray-700">
                                    Part of the <Link href={`/blog/${blog.parent_hub_id.slug}`} className="text-blue-600 font-bold hover:underline">{blog.parent_hub_id.title}</Link> series.
                                </p>
                            </div>
                        )}

                        <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                priority
                            />
                        </div>

                        <BlogContent content={processedContent} />

                        {/* Cluster Content (Spokes) for Pillar Pages */}
                        {blog.is_pillar_page && spokes.length > 0 && (
                            <div className="mt-16 border-t pt-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related In-Depth Guides</h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {spokes.map((spoke) => (
                                        <BlogCard key={spoke._id} blog={spoke} />
                                    ))}
                                </div>
                            </div>
                        )}
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
