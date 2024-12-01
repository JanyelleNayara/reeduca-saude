-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "intermittent_fastings" ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "endTime" DROP DEFAULT;

-- AlterTable
ALTER TABLE "meal_foods" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "measurements" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "water_consumptions" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updatedAt" DROP DEFAULT;
