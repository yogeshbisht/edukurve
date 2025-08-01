import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3-client";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { requireAdmin } from "@/data/admin/require-admin";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: "File name is required" }),
  contentType: z.string().min(1, { message: "Content type is required" }),
  size: z.number().min(1, { message: "Size is required" }),
  isImage: z.boolean().optional(),
});

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 2,
    })
  );

export async function POST(request: NextRequest) {
  const session = await requireAdmin();

  try {
    const decision = await aj.protect(request, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();

    const validation = fileUploadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { fileName, contentType, size, isImage } = validation.data;

    const uniqueId = `${uuidv4()}-${fileName}`;
    const uniqueKey = `${isImage ? "images" : "videos"}/${uniqueId}`;

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME_S3,
      ContentType: contentType,
      ContentLength: size,
      Key: uniqueKey,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 360, // expires in 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
