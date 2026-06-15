import { requireSession } from "@/lib/api/auth"
import { jsonError, jsonOk, readJson, validationError } from "@/lib/api/response"
import { skillUpdateSchema } from "@/lib/api/schemas"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const skill = await prisma.skill.findUnique({ where: { id } })

  if (!skill) return jsonError("Skill not found", 404)

  return jsonOk(skill)
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const { id } = await context.params
  const parsed = skillUpdateSchema.safeParse(await readJson(request))
  if (!parsed.success) return validationError(parsed.error)

  try {
    const skill = await prisma.skill.update({ where: { id }, data: parsed.data })
    return jsonOk(skill)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") return jsonError("Skill not found", 404)
      if (error.code === "P2002") return jsonError("Skill already exists", 409)
    }

    throw error
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const { id } = await context.params

  try {
    await prisma.skill.delete({ where: { id } })
    return jsonOk({ id })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return jsonError("Skill not found", 404)
    }

    throw error
  }
}
