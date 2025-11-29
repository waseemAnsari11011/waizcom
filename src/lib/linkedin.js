import axios from "axios";

export class LinkedInPlatform {
    constructor() {
        this.accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
        this.userInfoUrl = "https://api.linkedin.com/v2/userinfo";
        this.postUrl = "https://api.linkedin.com/v2/ugcPosts";
        this.registerUploadUrl = "https://api.linkedin.com/v2/assets?action=registerUpload";
    }

    async getProfileId() {
        try {
            const response = await axios.get(this.userInfoUrl, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });
            return response.data.sub;
        } catch (error) {
            console.error("Error fetching LinkedIn profile:", error.response?.data || error.message);
            throw new Error("Failed to fetch LinkedIn profile ID");
        }
    }

    async registerUpload() {
        try {
            const response = await axios.post(
                this.registerUploadUrl,
                {
                    registerUploadRequest: {
                        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
                        owner: `urn:li:person:${await this.getProfileId()}`,
                        serviceRelationships: [
                            {
                                relationshipType: "OWNER",
                                identifier: "urn:li:userGeneratedContent",
                            },
                        ],
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                }
            );
            return response.data.value;
        } catch (error) {
            console.error("Error registering upload:", error.response?.data || error.message);
            throw new Error("Failed to register upload on LinkedIn");
        }
    }

    async uploadImage(uploadUrl, imageBuffer) {
        try {
            await axios.put(uploadUrl, imageBuffer, {
                headers: {
                    "Content-Type": "image/jpeg", // Adjust based on image type if needed
                },
            });
        } catch (error) {
            console.error("Error uploading image binary:", error.response?.data || error.message);
            throw new Error("Failed to upload image binary to LinkedIn");
        }
    }

    async createPost(blog) {
        try {
            const profileId = await this.getProfileId();
            const author = `urn:li:person:${profileId}`;
            
            let mediaAssets = [];
            
            // Handle images if present
            if (blog.images && blog.images.length > 0) {
                // For now, let's assume we are passing image URLs or buffers. 
                // Since the blog object has S3 URLs, we need to fetch them first to upload to LinkedIn
                // OR we can change the flow to upload to LinkedIn while we have the file buffer in the route.
                // However, to keep it decoupled, let's fetch the image from S3 url.
                
                for (const imageUrl of blog.images) {
                    // Fetch image buffer
                    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    const imageBuffer = Buffer.from(imageResponse.data);

                    // 1. Register Upload
                    const uploadData = await this.registerUpload();
                    const uploadUrl = uploadData.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
                    const asset = uploadData.asset;

                    // 2. Upload Image
                    await this.uploadImage(uploadUrl, imageBuffer);
                    
                    mediaAssets.push(asset);
                }
            }

            // Construct the post body
            const postBody = {
                author: author,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: {
                            text: `${blog.title}\n\n${blog.content.substring(0, 200)}...\n\nRead more at: https://waizcom.com/blog/${blog.slug}\n\n#${blog.tags.join(" #")}`,
                        },
                        shareMediaCategory: mediaAssets.length > 0 ? "IMAGE" : "NONE",
                        media: mediaAssets.map(asset => ({
                            status: "READY",
                            description: {
                                text: blog.title,
                            },
                            media: asset,
                            title: {
                                text: blog.title,
                            },
                        })),
                    },
                },
                visibility: {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
                },
            };

            const response = await axios.post(this.postUrl, postBody, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error creating LinkedIn post:", error.response?.data || error.message);
            throw new Error("Failed to create LinkedIn post");
        }
    }
}
