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

// Create a synchronous initialization function that returns a PrismaClient
function createPrismaClientSync(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === Environments.DEV
      ? ["query", "error", "warn"]
      : ["error"],
  });
}

// Initialize the client synchronously
const db = globalForPrisma.prisma ?? createPrismaClientSync();

// Store the client in the global object in development
if (process.env.NODE_ENV !== Environments.PROD) {
  globalForPrisma.prisma = db;
}

// Export the client
export { db };
