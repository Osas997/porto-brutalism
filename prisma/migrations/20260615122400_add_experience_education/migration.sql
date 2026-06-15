-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "education" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "experience" JSONB NOT NULL DEFAULT '[]';
