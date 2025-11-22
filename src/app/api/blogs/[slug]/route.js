import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/models/Blog";

export const GET = async (request, { params }) => {
    const { slug } = params;

    try {
        await connect();
        const blog = await Blog.findOne({ slug });
        return new NextResponse(JSON.stringify(blog), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { slug } = params;

    try {
        await connect();
        await Blog.findOneAndDelete({ slug });
        return new NextResponse("Blog has been deleted", { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
