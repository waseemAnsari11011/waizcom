"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import useSWR from "swr";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const EditBlog = ({ params }) => {
    const session = useSession();
    const router = useRouter();
    const { data: blog, isLoading } = useSWR(`/api/blogs/${params.slug}`, fetcher);

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [session.status, router]);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setImage(blog.image);
            setContent(blog.content);
            setTags(blog.tags.join(", "));
        }
    }, [blog]);

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
            ],
        }),
        []
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(tag => tag.length > 0);

        try {
            const res = await fetch(`/api/blogs/${params.slug}`, {
                method: "PUT",
                body: JSON.stringify({
                    title,
                    slug: newSlug,
                    image,
                    content,
                    tags: tagsArray,
                }),
            });

            if (res.status === 200) {
                router.push("/admin");
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (session.status === "loading" || isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    if (session.status === "authenticated") {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Edit Blog
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                placeholder="Blog Title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Featured Image URL
                            </label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <div className="h-64 mb-12">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    className="h-full"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                placeholder="tech, nextjs, web development"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => router.push("/admin")}
                                className="w-full rounded-md bg-gray-500 py-3 text-white hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700 transition duration-300"
                            >
                                Update Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};

export default EditBlog;
