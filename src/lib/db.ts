import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.__prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

export default prisma;

/**
 * Database utility functions
 */
export class DatabaseService {
  /**
   * Get database connection status
   */
  static async getConnectionStatus(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error("Database connection failed:", error);
      return false;
    }
  }

  /**
   * Close database connection
   */
  static async disconnect(): Promise<void> {
    await prisma.$disconnect();
  }

  /**
   * Reset database (for testing purposes)
   */
  static async reset(): Promise<void> {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Cannot reset database in production");
    }
    await prisma.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE`;
    await prisma.$executeRaw`CREATE SCHEMA public`;
  }
}

export { prisma };
