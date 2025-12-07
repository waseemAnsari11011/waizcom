import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return new NextResponse("No file uploaded", { status: 400 });
        }

        const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
        const imageUrl = await uploadToS3(file, filename);

        return new NextResponse(JSON.stringify({ url: imageUrl }), { status: 200 });
    } catch (err) {
        console.error("Upload Error:", err);
        return new NextResponse("Upload Error", { status: 500 });
    }
};
