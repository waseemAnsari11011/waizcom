import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/models/Blog";

export const GET = async (request) => {
    try {
        await connect();
        const { searchParams } = new URL(request.url);
        const isHub = searchParams.get('isHub');
        const silo = searchParams.get('silo');
        const status = searchParams.get('status'); // 'published' or undefined (all)

        let query = {};
        if (isHub === 'true') {
            query.is_pillar_page = true;
        }
        if (silo) {
            query.silo_category = silo;
        }
        if (status === 'published') {
            query.isPublished = true;
        }

        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        return new NextResponse(JSON.stringify(blogs), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

import { uploadToS3 } from "@/lib/s3";
import { socialMediaService } from "@/lib/socialMedia";

export const POST = async (request) => {
    const body = await request.formData();

    const title = body.get("title");
    const slug = body.get("slug");
    const content = body.get("content");
    const file = body.get("file");
    const tags = JSON.parse(body.get("tags") || "[]");
    const silo_category = body.get("silo_category");
    const content_pillar = body.get("content_pillar");
    const is_pillar_page = body.get("is_pillar_page") === 'true';
    const parent_hub_id = body.get("parent_hub_id");
    const isPublished = body.get("isPublished") === 'true';

    if (!file) {
        return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    try {
        await connect();

        // Upload image to S3
        const imageUrl = await uploadToS3(buffer, filename);

        const newBlog = new Blog({
            title,
            slug,
            content,
            tags,
            image: imageUrl, // Main image
            images: [imageUrl], // All images
            silo_category,
            content_pillar,
            is_pillar_page,
            parent_hub_id,
            isPublished
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
