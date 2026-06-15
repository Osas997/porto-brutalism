import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"
import { hashPassword } from "better-auth/crypto"

const username = process.env.SEED_ADMIN_USERNAME ?? "admin"
const password = process.env.SEED_ADMIN_PASSWORD
const email = process.env.SEED_ADMIN_EMAIL ?? username + "@local.dev"
const name = process.env.SEED_ADMIN_NAME ?? "Admin"
const databaseUrl = process.env.DATABASE_URL

if (!password) {
  throw new Error("SEED_ADMIN_PASSWORD is required")
}

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required")
}

const seedPassword = password

const adapter = new PrismaPg({
  connectionString: databaseUrl,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const normalizedUsername = username.toLowerCase()
  const passwordHash = await hashPassword(seedPassword)
  const accountId = "credential:" + normalizedUsername

  const user = await prisma.user.upsert({
    where: { username: normalizedUsername },
    update: {
      email,
      name,
      displayUsername: username,
      emailVerified: true,
    },
    create: {
      id: crypto.randomUUID(),
      email,
      name,
      username: normalizedUsername,
      displayUsername: username,
      emailVerified: true,
    },
  })

  await prisma.account.upsert({
    where: { id: accountId },
    update: {
      accountId: user.id,
      providerId: "credential",
      password: passwordHash,
    },
    create: {
      id: accountId,
      accountId: user.id,
      providerId: "credential",
      userId: user.id,
      password: passwordHash,
    },
  })

  console.log("Seeded user: " + normalizedUsername)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })