import { requireSession } from "@/lib/api/auth"
import { jsonError, jsonOk, readJson, validationError } from "@/lib/api/response"
import { profileSchema } from "@/lib/api/schemas"
import { prisma } from "@/lib/prisma"

const profileId = "default"

export async function GET() {
  const profile = await prisma.profile.findUnique({ where: { id: profileId } })

  if (!profile) return jsonError("Profile not found", 404)

  return jsonOk(profile)
}

export async function PUT(request: Request) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const parsed = profileSchema.safeParse(await readJson(request))
  if (!parsed.success) return validationError(parsed.error)

  const profile = await prisma.profile.upsert({
    where: { id: profileId },
    update: parsed.data,
    create: {
      id: profileId,
      ...parsed.data,
    },
  })

  return jsonOk(profile)
}

export async function PATCH(request: Request) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const parsed = profileSchema.partial().safeParse(await readJson(request))
  if (!parsed.success) return validationError(parsed.error)

  const profile = await prisma.profile.update({
    where: { id: profileId },
    data: parsed.data,
  })

  return jsonOk(profile)
}
