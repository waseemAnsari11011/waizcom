import { LinkedInPlatform } from "./linkedin";

class SocialMediaService {
    constructor() {
        this.platforms = [];
        // Initialize platforms if credentials exist
        if (process.env.LINKEDIN_ACCESS_TOKEN) {
            this.platforms.push(new LinkedInPlatform());
        }
    }

    async broadcast(blog) {
        const results = [];
        for (const platform of this.platforms) {
            try {
                const result = await platform.createPost(blog);
                results.push({ platform: platform.constructor.name, status: "success", data: result });
            } catch (error) {
                console.error(`Failed to post to ${platform.constructor.name}:`, error);
                results.push({ platform: platform.constructor.name, status: "failed", error: error.message });
            }
        }
        return results;
    }
}

export const socialMediaService = new SocialMediaService();
