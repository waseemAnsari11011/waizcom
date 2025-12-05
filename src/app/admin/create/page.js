"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBlog = () => {
    const session = useSession();
    const router = useRouter();
    const [postType, setPostType] = useState("spoke"); // 'hub' or 'spoke'
    const [parentHub, setParentHub] = useState("");
    const [availableHubs, setAvailableHubs] = useState([]);
    const [content, setContent] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        // Fetch all hubs for the dropdown
        const fetchHubs = async () => {
            try {
                const res = await fetch(`/api/blogs?isHub=true`);
                if (res.ok) {
                    const data = await res.json();
                    setAvailableHubs(data);
                }
            } catch (err) {
                console.error("Error fetching hubs:", err);
            }
        };
        fetchHubs();
    }, []);

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [session.status, router]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
        const imageFile = e.target.image.files[0];
        const tagsInput = e.target.tags.value;
        const tags = tagsInput.split(",").map((tag) => tag.trim()).filter(tag => tag.length > 0);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("content", content);
        formData.append("tags", JSON.stringify(tags));
        formData.append("is_pillar_page", postType === "hub");
        
        if (postType === "spoke") {
            formData.append("parent_hub_id", parentHub);
        }

        if (imageFile) {
            formData.append("file", imageFile);
        }

        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                body: formData,
            });

            if (res.status === 201) {
                router.push("/admin");
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (session.status === "loading") {
        return <div className="p-8">Loading...</div>;
    }

    if (session.status === "authenticated") {
        return (
            <div className="min-h-screen bg-gray-100 p-8 pt-32">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-6 text-2xl font-bold text-gray-800">
                        Create New Blog
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Post Type Toggle */}
                        <div className="flex gap-6 mb-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="postType" 
                                    value="hub" 
                                    checked={postType === "hub"} 
                                    onChange={(e) => setPostType(e.target.value)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-gray-900 font-medium">Create New Hub</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="postType" 
                                    value="spoke" 
                                    checked={postType === "spoke"} 
                                    onChange={(e) => setPostType(e.target.value)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-gray-900 font-medium">Create Article for Hub</span>
                            </label>
                        </div>

                        {/* Hub Selection (For Spokes) */}
                        {postType === "spoke" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select Parent Hub</label>
                                <select 
                                    value={parentHub} 
                                    onChange={(e) => setParentHub(e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                    required={postType === "spoke"}
                                >
                                    <option value="">Select a Hub</option>
                                    {availableHubs.map(hub => (
                                        <option key={hub._id} value={hub._id}>{hub.title}</option>
                                    ))}
                                </select>
                                {availableHubs.length === 0 && (
                                    <p className="text-xs text-red-500 mt-1">No Hubs found. Please create a Hub first.</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
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
                                name="image"
                                accept="image/*"
                                required
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
                                name="tags"
                                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                placeholder="tech, nextjs, web development"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700 transition duration-300"
                        >
                            Publish Blog
                        </button>
                    </form>
                </div>
            </div>
        );
    }
};

export default CreateBlog;
