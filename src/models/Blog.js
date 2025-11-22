import mongoose from "mongoose";

const { Schema } = mongoose;

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
        tags: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
