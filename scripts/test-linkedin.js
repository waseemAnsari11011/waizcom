const { socialMediaService } = require("../src/lib/socialMedia");
const dotenv = require("dotenv");
dotenv.config();

async function testLinkedIn() {
    console.log("Testing LinkedIn Integration...");

    if (!process.env.LINKEDIN_ACCESS_TOKEN) {
        console.error("Error: LINKEDIN_ACCESS_TOKEN is not set in .env");
        return;
    }

    const mockBlog = {
        title: "Test Blog Post from Script",
        slug: "test-blog-post",
        content: "This is a test post to verify the LinkedIn integration script.",
        tags: ["test", "linkedin", "api"],
        images: [
            "https://via.placeholder.com/800x400.png?text=Test+Image+1",
            "https://via.placeholder.com/800x400.png?text=Test+Image+2"
        ]
    };

    try {
        console.log("Broadcasting mock blog...");
        const results = await socialMediaService.broadcast(mockBlog);
        console.log("Broadcast Results:", JSON.stringify(results, null, 2));
    } catch (error) {
        console.error("Test Failed:", error);
    }
}

testLinkedIn();
