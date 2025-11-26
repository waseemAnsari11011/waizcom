import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/models/Blog";

export const GET = async (request) => {
    try {
        await connect();
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return new NextResponse(JSON.stringify(blogs), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: "Database Error" }), { status: 500 });
    }
};

import { uploadToS3 } from "@/lib/s3";

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const title = formData.get("title");
        const slug = formData.get("slug");
        const content = formData.get("content");
        const tags = JSON.parse(formData.get("tags"));
        const file = formData.get("file");

        let imageUrl = "";
        if (file) {
            const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
            imageUrl = await uploadToS3(file, filename);
        }

        const newBlog = new Blog({
            title,
            slug,
            content,
            tags,
            image: imageUrl,
        });

        await connect();
        await newBlog.save();
        return new NextResponse("Blog has been created", { status: 201 });
    } catch (err) {
        console.error("Database/Upload Error:", err);
        return new NextResponse("Database/Upload Error", { status: 500 });
    }
};
