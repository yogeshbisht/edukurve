import { s3Client } from "@/lib/s3-client";
import { env } from "@/lib/env";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { key } = body;

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME_S3,
      Key: key,
    });

    const response = await s3Client.send(command);

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
};
