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
    const [imagePreview, setImagePreview] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const [silo, setSilo] = useState("");
    const [pillar, setPillar] = useState("");
    const [isHub, setIsHub] = useState(false);
    const [parentHub, setParentHub] = useState("");
    const [availableHubs, setAvailableHubs] = useState([]);

    const silos = {
        "Build": ["Technical", "Economic"],
        "Market": ["Growth", "Vertical"],
        "Comparison": ["Competitive"]
    };

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setImage(blog.image);
            setImagePreview(blog.image);
            setContent(blog.content);
            setTags(blog.tags.join(", "));
            setSilo(blog.silo_category || "");
            setPillar(blog.content_pillar || "");
            setIsHub(blog.is_pillar_page || false);
            setParentHub(blog.parent_hub_id || "");
        }
    }, [blog]);

    useEffect(() => {
        if (silo && !isHub) {
            // Fetch hubs for this silo
            const fetchHubs = async () => {
                try {
                    const res = await fetch(`/api/blogs?isHub=true&silo=${silo}`);
                    if (res.ok) {
                        const data = await res.json();
                        setAvailableHubs(data);
                    }
                } catch (err) {
                    console.error("Error fetching hubs:", err);
                }
            };
            fetchHubs();
        } else {
            setAvailableHubs([]);
        }
    }, [silo, isHub]);

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
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
                handlers: {
                    image: function () {
                        const quill = this.quill;
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.click();

                        input.onchange = async () => {
                            const file = input.files[0];
                            if (file) {
                                const formData = new FormData();
                                formData.append("file", file);

                                try {
                                    const res = await fetch("/api/upload", {
                                        method: "POST",
                                        body: formData,
                                    });

                                    if (res.ok) {
                                        const data = await res.json();
                                        const range = quill.getSelection();
                                        quill.insertEmbed(range.index, "image", data.url);
                                    } else {
                                        console.error("Image upload failed");
                                    }
                                } catch (err) {
                                    console.error("Error uploading image:", err);
                                }
                            }
                        };
                    },
                },
            },
        }),
        []
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(tag => tag.length > 0);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", newSlug);
        formData.append("content", content);
        formData.append("tags", JSON.stringify(tagsArray));
        formData.append("silo_category", silo);
        formData.append("content_pillar", pillar);
        formData.append("is_pillar_page", isHub);
        if (!isHub && parentHub) {
            formData.append("parent_hub_id", parentHub);
        }
        formData.append("image", image); // Send existing image URL
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        try {
            const res = await fetch(`/api/blogs/${params.slug}`, {
                method: "PUT",
                body: formData,
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Silo Category</label>
                                <select 
                                    value={silo} 
                                    onChange={(e) => {
                                        setSilo(e.target.value);
                                        setPillar(""); // Reset pillar when silo changes
                                    }}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                    required
                                >
                                    <option value="">Select Silo</option>
                                    {Object.keys(silos).map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content Pillar</label>
                                <select 
                                    value={pillar} 
                                    onChange={(e) => setPillar(e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                    required
                                    disabled={!silo}
                                >
                                    <option value="">Select Pillar</option>
                                    {silo && silos[silo].map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <input 
                                type="checkbox" 
                                id="isHub" 
                                checked={isHub} 
                                onChange={(e) => setIsHub(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isHub" className="text-sm font-medium text-gray-700">
                                Is this a Pillar Page (Hub)?
                            </label>
                        </div>

                        {!isHub && silo && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Parent Hub (Required for Spokes)</label>
                                <select 
                                    value={parentHub} 
                                    onChange={(e) => setParentHub(e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                    required={!isHub}
                                >
                                    <option value="">Select Parent Hub</option>
                                    {availableHubs.map(hub => (
                                        <option key={hub._id} value={hub._id}>{hub.title}</option>
                                    ))}
                                </select>
                                {availableHubs.length === 0 && (
                                    <p className="text-xs text-red-500 mt-1">No Hubs found for this Silo. Please create a Hub page first.</p>
                                )}
                            </div>
                        )}

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
                                Featured Image
                            </label>
                            {imagePreview && (
                                <div className="mb-2 h-48 w-full overflow-hidden rounded-md bg-gray-100" style={{ width: "fit-content", margin: '10px' }}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
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
