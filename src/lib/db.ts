import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Add connect_timeout for Neon cold start (free tier databases sleep after inactivity)
const databaseUrl = process.env.DATABASE_URL?.includes('?')
    ? `${process.env.DATABASE_URL}&connect_timeout=60&pool_timeout=60`
    : `${process.env.DATABASE_URL}?connect_timeout=60&pool_timeout=60`;

export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
        datasourceUrl: databaseUrl,
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
