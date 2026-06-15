import { requireSession } from "@/lib/api/auth"
import { jsonCreated, jsonError, jsonOk, readJson, validationError } from "@/lib/api/response"
import { projectCreateSchema, toSlug } from "@/lib/api/schemas"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  })

  return jsonOk(projects)
}

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const parsed = projectCreateSchema.safeParse(await readJson(request))
  if (!parsed.success) return validationError(parsed.error)

  const slug = parsed.data.slug ?? toSlug(parsed.data.title)
  if (!slug) return jsonError("Project slug is invalid", 422)

  try {
    const project = await prisma.project.create({
      data: {
        ...parsed.data,
        slug,
      },
    })

    return jsonCreated(project)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return jsonError("Project slug already exists", 409)
    }

    throw error
  }
}
