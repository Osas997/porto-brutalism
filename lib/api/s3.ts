import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const endpoint = process.env.S3_ENDPOINT
const region = process.env.REGION
const accessKeyId = process.env.ACCESS_ID
const secretAccessKey = process.env.SECRET_ACCESS
const bucket = process.env.S3_BUCKET ?? process.env.SUPABASE_BUCKET ?? process.env.STORAGE_BUCKET

let s3Client: S3Client | null = null

function getS3Client() {
  if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("S3 configuration is incomplete")
  }

  if (!s3Client) {
    s3Client = new S3Client({
      endpoint,
      forcePathStyle: true,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }

  return s3Client
}

function getEndpoint() {
  if (!endpoint) {
    throw new Error("S3_ENDPOINT is required")
  }

  return endpoint
}

function getBucket() {
  if (!bucket) {
    throw new Error("S3_BUCKET, SUPABASE_BUCKET, or STORAGE_BUCKET is required")
  }

  return bucket
}

function sanitizeFilename(filename: string) {
  const safeName = filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return safeName || "upload"
}

export async function uploadImage(file: File, folder = "projects") {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are allowed")
  }

  const maxBytes = 5 * 1024 * 1024
  if (file.size > maxBytes) {
    throw new Error("Image must be 5MB or smaller")
  }

  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg"
  const key = `${folder}/${crypto.randomUUID()}-${sanitizeFilename(file.name)}${file.name.includes(".") ? "" : `.${extension}`}`
  const body = Buffer.from(await file.arrayBuffer())

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      Body: body,
      ContentType: file.type,
    }),
  )

  const publicBaseUrl = getEndpoint().replace(/\/s3\/?$/, "")

  return `${publicBaseUrl}/object/public/${getBucket()}/${key}`
}
