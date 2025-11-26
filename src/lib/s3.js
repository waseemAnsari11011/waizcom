import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function uploadToS3(file, filename) {
    try {
        const buffer = await file.arrayBuffer();
        const compressedBuffer = await sharp(Buffer.from(buffer))
            .resize({ width: 1200, withoutEnlargement: true }) // Resize to max width 1200px
            .jpeg({ quality: 80 }) // Compress to JPEG with 80% quality
            .toBuffer();

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
            Body: compressedBuffer,
            ContentType: "image/jpeg",
            // ACL: "public-read", // Uncomment if bucket is not public by default, but usually handled by bucket policy
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
    } catch (error) {
        console.error("S3 Upload Error:", error);
        throw new Error("Failed to upload image to S3");
    }
}
