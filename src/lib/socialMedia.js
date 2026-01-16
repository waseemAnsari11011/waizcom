import { LinkedInPlatform } from "./linkedin";

class SocialMediaService {
    constructor() {
        this.platforms = [];
        // Initialize platforms if credentials exist
        if (process.env.LINKEDIN_ACCESS_TOKEN) {
            this.platforms.push(new LinkedInPlatform());
        }
    }
//
    async broadcast(blog) {
        console.log("SocialMediaService: Starting broadcast for blog:", blog.title);
        const results = [];
        for (const platform of this.platforms) {
            try {
                console.log(`SocialMediaService: Broadcasting to ${platform.constructor.name}...`);
                const result = await platform.createPost(blog);
                console.log(`SocialMediaService: Successfully posted to ${platform.constructor.name}`);
                results.push({ platform: platform.constructor.name, status: "success", data: result });
            } catch (error) {
                console.error(`SocialMediaService: Failed to post to ${platform.constructor.name}:`, error);
                results.push({ platform: platform.constructor.name, status: "failed", error: error.message });
            }
        }
        console.log("SocialMediaService: Broadcast completed. Results:", JSON.stringify(results, null, 2));
        return results;
    }
}

export const socialMediaService = new SocialMediaService();
