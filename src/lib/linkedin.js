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

    async getOwnerUrn() {
        if (process.env.LINKEDIN_ORG_ID) {
            return `urn:li:organization:${process.env.LINKEDIN_ORG_ID}`;
        }
        const profileId = await this.getProfileId();
        return `urn:li:person:${profileId}`;
    }

    async registerUpload() {
        try {
            const owner = await this.getOwnerUrn();
            const response = await axios.post(
                this.registerUploadUrl,
                {
                    registerUploadRequest: {
                        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
                        owner: owner,
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
        console.log("LinkedInPlatform: Starting createPost for blog:", blog.title);
        try {
            const author = await this.getOwnerUrn();
            console.log("LinkedInPlatform: Posting as author:", author);
            
            let mediaAssets = [];
            
            if (blog.images && blog.images.length > 0) {
                console.log(`LinkedInPlatform: Processing ${blog.images.length} images`);
                for (const imageUrl of blog.images) {
                    try {
                        console.log("LinkedInPlatform: Fetching image from:", imageUrl);
                        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                        const imageBuffer = Buffer.from(imageResponse.data);
                        console.log("LinkedInPlatform: Image fetched, size:", imageBuffer.length);

                        // 1. Register Upload
                        console.log("LinkedInPlatform: Registering upload...");
                        const uploadData = await this.registerUpload();
                        const uploadUrl = uploadData.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
                        const asset = uploadData.asset;
                        console.log("LinkedInPlatform: Upload registered. Asset:", asset);

                        // 2. Upload Image
                        console.log("LinkedInPlatform: Uploading image binary...");
                        await this.uploadImage(uploadUrl, imageBuffer);
                        console.log("LinkedInPlatform: Image binary uploaded successfully");
                        
                        mediaAssets.push(asset);
                    } catch (imgError) {
                        console.error("LinkedInPlatform: Error processing image:", imageUrl, imgError.message);
                        // Continue with other images or post without this image
                    }
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

            console.log("LinkedInPlatform: Sending post request to LinkedIn...");
            const response = await axios.post(this.postUrl, postBody, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });

            console.log("LinkedInPlatform: Post created successfully. ID:", response.data.id);
            return response.data;
        } catch (error) {
            console.error("LinkedInPlatform: Error creating LinkedIn post:", error.response?.data || error.message);
            if (error.response?.data) {
                console.error("LinkedInPlatform: Full Error Details:", JSON.stringify(error.response.data, null, 2));
            }
            throw new Error(`Failed to create LinkedIn post: ${JSON.stringify(error.response?.data || error.message)}`);
        }
    }
}
