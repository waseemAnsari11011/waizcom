import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/models/Blog";

export const GET = async (request, { params }) => {
    const { slug } = params;

    try {
        await connect();
        const blog = await Blog.findOne({ slug });
        return new NextResponse(JSON.stringify(blog), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { slug } = params;

    try {
        await connect();
        await Blog.findOneAndDelete({ slug });
        return new NextResponse("Blog has been deleted", { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

import { uploadToS3 } from "@/lib/s3";

export const PUT = async (request, { params }) => {
    const { slug } = params;

    try {
        const formData = await request.formData();
        const title = formData.get("title");
        const newSlug = formData.get("slug");
        const content = formData.get("content");
        const tags = JSON.parse(formData.get("tags"));
        const file = formData.get("file");
        const existingImage = formData.get("image");
        const silo_category = formData.get("silo_category");
        const content_pillar = formData.get("content_pillar");
        const is_pillar_page = formData.get("is_pillar_page") === 'true';
        const parent_hub_id = formData.get("parent_hub_id") || null;

        let imageUrl = existingImage;
        if (file && typeof file !== "string") {
            const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
            imageUrl = await uploadToS3(file, filename);
        }

        const updateData = {
            title,
            slug: newSlug,
            content,
            tags,
            image: imageUrl,
            silo_category,
            content_pillar,
            is_pillar_page,
            parent_hub_id
        };

        await connect();
        const updatedBlog = await Blog.findOneAndUpdate(
            { slug },
            { $set: updateData },
            { new: true }
        );
        return new NextResponse(JSON.stringify(updatedBlog), { status: 200 });
    } catch (err) {
        console.error("Database/Upload Error:", err);
        return new NextResponse("Database/Upload Error", { status: 500 });
    }
};
