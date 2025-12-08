import mongoose from "mongoose";

const { Schema } = mongoose;
//
const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
        keywords: {
            type: [String],
            default: [],
        },
        silo_category: {
            type: String,
            enum: ['Build', 'Market', 'Comparison'],
            required: false // Optional for now to support legacy blogs, but UI will enforce it
        },
        content_pillar: {
            type: String,
            enum: ['Economic', 'Competitive', 'Technical', 'Vertical', 'Growth'],
            required: false
        },
        is_pillar_page: {
            type: Boolean,
            default: false
        },
        parent_hub_id: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
            required: false
        },
        isPublished: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

// Force model recompilation in dev to apply schema changes
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Blog;
}

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
