import React from "react";
import BlogList from "../components/Blog/BlogList";

export const metadata = {
    title: "Our Blog - Waizcom",
    description: "Read our latest insights, news, and articles.",
};

const BlogPage = () => {
    return (
        <div className="pt-24 pb-16">
            <BlogList />
        </div>
    );
};

export default BlogPage;
