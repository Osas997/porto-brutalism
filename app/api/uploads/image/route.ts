import { requireSession } from "@/lib/api/auth"
import { jsonCreated, jsonError } from "@/lib/api/response"
import { uploadImage } from "@/lib/api/s3"

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const formData = await request.formData()
  const file = formData.get("file")
  const folder = formData.get("folder")

  if (!(file instanceof File)) {
    return jsonError("file is required", 422)
  }

  try {
    const url = await uploadImage(file, typeof folder === "string" ? folder : "projects")
    return jsonCreated({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed"
    return jsonError(message, 400)
  }
}
