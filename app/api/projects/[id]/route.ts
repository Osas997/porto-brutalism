import { requireSession } from "@/lib/api/auth"
import { jsonError, jsonOk, readJson, validationError } from "@/lib/api/response"
import { projectUpdateSchema, toSlug } from "@/lib/api/schemas"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const project = await prisma.project.findUnique({ where: { id } })

  if (!project) return jsonError("Project not found", 404)

  return jsonOk(project)
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const { id } = await context.params
  const parsed = projectUpdateSchema.safeParse(await readJson(request))
  if (!parsed.success) return validationError(parsed.error)

  const data = {
    ...parsed.data,
    slug: parsed.data.slug ?? (parsed.data.title ? toSlug(parsed.data.title) : undefined),
  }

  try {
    const project = await prisma.project.update({
      where: { id },
      data,
    })

    return jsonOk(project)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") return jsonError("Project not found", 404)
      if (error.code === "P2002") return jsonError("Project slug already exists", 409)
    }

    throw error
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const { id } = await context.params

  try {
    await prisma.project.delete({ where: { id } })
    return jsonOk({ id })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return jsonError("Project not found", 404)
    }

    throw error
  }
}
