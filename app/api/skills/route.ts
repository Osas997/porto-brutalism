import { SkillCategory } from "@/generated/prisma/client"
import { requireSession } from "@/lib/api/auth"
import { jsonCreated, jsonError, jsonOk, readJson, validationError } from "@/lib/api/response"
import { skillCreateSchema } from "@/lib/api/schemas"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  const skills = await prisma.skill.findMany({
    where: category ? { category: category as SkillCategory } : undefined,
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  })

  return jsonOk(skills)
}

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) return jsonError("Unauthorized", 401)

  const parsed = skillCreateSchema.safeParse(await readJson(request))
  if (!parsed.success) return validationError(parsed.error)

  try {
    const skill = await prisma.skill.create({ data: parsed.data })
    return jsonCreated(skill)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return jsonError("Skill already exists", 409)
    }

    throw error
  }
}
