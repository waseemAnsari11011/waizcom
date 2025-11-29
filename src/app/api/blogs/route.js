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
import { socialMediaService } from "@/lib/socialMedia";

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const title = formData.get("title");
        const slug = formData.get("slug");
        const content = formData.get("content");
        const tags = JSON.parse(formData.get("tags"));
        
        // Handle multiple files
        const files = formData.getAll("file"); // Assuming frontend sends multiple 'file' fields or we change it to 'files'
        // If frontend sends 'file' for single and 'files' for multiple, we need to handle both.
        // For now, let's assume we want to support 'files' key for multiple images, but keep 'file' for backward compatibility if needed.
        // Or better, just get all 'file' entries.
        
        const imageUrls = [];
        for (const file of files) {
            if (file && file.name) {
                 const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
                 const url = await uploadToS3(file, filename);
                 imageUrls.push(url);
            }
        }

        const newBlog = new Blog({
            title,
            slug,
            content,
            tags,
            image: imageUrls.length > 0 ? imageUrls[0] : "", // Main image
            images: imageUrls, // All images
        });

        await connect();
        await newBlog.save();

        // Trigger Social Media Post
        // We don't want to block the response, so we can run this asynchronously
        // However, in serverless (Vercel), background tasks might be killed.
        // For now, we will await it to ensure it runs, or use a queue in a real production app.
        // Let's await it for simplicity and reliability in this context.
        console.log("API: Blog created. Initiating Social Media Broadcast...");
        try {
            await socialMediaService.broadcast(newBlog);
            console.log("API: Social Media Broadcast finished.");
        } catch (broadcastError) {
            console.error("API: Social Media Broadcast failed:", broadcastError);
        }

        return new NextResponse("Blog has been created", { status: 201 });
    } catch (err) {
        console.error("Database/Upload Error:", err);
        return new NextResponse(JSON.stringify({ error: "Database/Upload Error", details: err.message }), { status: 500 });
    }
};
