import { Environments } from "@/constants/enums";
import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function createPrismaClient() {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const client = new PrismaClient();
      // Test the connection
      await client.$connect();
      return client;
    } catch (error) {
      retries++;
      if (retries === MAX_RETRIES) {
        console.error("Failed to connect to database after", MAX_RETRIES, "attempts");
        throw error;
      }
      console.warn(`Database connection attempt ${retries} failed, retrying in ${RETRY_DELAY}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

export const db = globalForPrisma.prisma ?? await createPrismaClient();

if (process.env.NODE_ENV !== Environments.PROD) globalForPrisma.prisma = db;
