-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
