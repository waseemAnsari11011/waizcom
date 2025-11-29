import { NextResponse } from "next/server";
import { socialMediaService } from "@/lib/socialMedia";

export const GET = async (request) => {
    console.log("Test API: Starting LinkedIn Test...");
    
    const timestamp = Date.now();
    const mockBlog = {
        title: `Test Blog Post from API Route - ${timestamp}`,
        slug: `test-blog-post-api-${timestamp}`,
        content: "This is a test post to verify the LinkedIn integration via Next.js API route.",
        tags: ["test", "linkedin", "api", "nextjs"],
        images: [
            "https://via.placeholder.com/800x400.png?text=Test+Image+1",
            "https://via.placeholder.com/800x400.png?text=Test+Image+2"
        ]
    };

    try {
        const results = await socialMediaService.broadcast(mockBlog);
        return new NextResponse(JSON.stringify({ status: "Test Finished", results }), { status: 200 });
    } catch (error) {
        console.error("Test API: Failed:", error);
        return new NextResponse(JSON.stringify({ error: error.message, stack: error.stack }), { status: 500 });
    }
};
