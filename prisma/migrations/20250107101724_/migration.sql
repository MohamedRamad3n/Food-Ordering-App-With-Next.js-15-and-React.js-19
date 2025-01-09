-- CreateEnum
CREATE TYPE "ExtraName" AS ENUM ('CHEESE', 'TOMATO', 'OLIVES', 'PEPPERONI', 'MUSHROOMS', 'BACON', 'ONIONS', 'GREEN_PEPPERS', 'PINEAPPLE', 'HAM', 'SAUSAGE', 'CHICKEN', 'BEEF');

-- CreateTable
CREATE TABLE "Extra" (
    "id" TEXT NOT NULL,
    "name" "ExtraName" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
