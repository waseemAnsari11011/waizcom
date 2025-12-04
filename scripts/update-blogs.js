const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env");
  process.exit(1);
}

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    silo_category: {
      type: String,
      enum: ["Build", "Market", "Comparison"],
      required: false,
    },
    content_pillar: {
      type: String,
      enum: ["Economic", "Competitive", "Technical", "Vertical", "Growth"],
      required: false,
    },
    is_pillar_page: { type: Boolean, default: false },
    parent_hub_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: false },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

async function updateBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const blogs = await Blog.find({ silo_category: { $exists: false } });
    console.log(`Found ${blogs.length} blogs without Silo Category`);

    for (const blog of blogs) {
      // Default to 'Build' / 'Technical' for existing blogs
      blog.silo_category = "Build";
      blog.content_pillar = "Technical";
      await blog.save();
      console.log(`Updated blog: ${blog.title}`);
    }

    console.log("All blogs updated successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error updating blogs:", error);
    process.exit(1);
  }
}

updateBlogs();
