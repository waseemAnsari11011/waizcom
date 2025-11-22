import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const GET = async (request) => {
    try {
        await connect();

        // Check if user already exists
        const existingUser = await User.findOne({ email: "admin@example.com" });
        if (existingUser) {
            return new NextResponse("User already exists. Email: admin@example.com", { status: 200 });
        }

        const hashedPassword = await bcrypt.hash("admin123", 5);
        const newUser = new User({
            email: "admin@example.com",
            password: hashedPassword,
        });

        await newUser.save();
        return new NextResponse("Admin user created. Email: admin@example.com, Password: admin123", { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error: " + err.message, { status: 500 });
    }
};
