import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/models/Blog";

export const GET = async (request) => {
    try {
        await connect();
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return new NextResponse(JSON.stringify(blogs), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: "Database Error" }), { status: 500 });
    }
};

export const POST = async (request) => {
    const body = await request.json();
    const newBlog = new Blog(body);

    try {
        await connect();
        await newBlog.save();
        return new NextResponse("Blog has been created", { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
