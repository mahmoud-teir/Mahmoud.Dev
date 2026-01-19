// Simple in-memory rate limiting
// For production, consider using Upstash Redis for distributed rate limiting

const inMemoryStore = new Map<string, { count: number; timestamp: number }>();

/**
 * Simple rate limiter that works in-memory
 * @param identifier - Unique identifier (e.g., IP address)
 * @param maxRequests - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns boolean - true if allowed, false if rate limited
 */
export function simpleRateLimit(
    identifier: string,
    maxRequests = 5,
    windowMs = 60000
): boolean {
    const now = Date.now();
    const record = inMemoryStore.get(identifier);

    // Clean up old entries periodically
    if (inMemoryStore.size > 10000) {
        const cutoff = now - windowMs;
        for (const [key, value] of inMemoryStore.entries()) {
            if (value.timestamp < cutoff) {
                inMemoryStore.delete(key);
            }
        }
    }

    if (!record || now - record.timestamp > windowMs) {
        inMemoryStore.set(identifier, { count: 1, timestamp: now });
        return true;
    }

    if (record.count >= maxRequests) {
        return false;
    }

    record.count++;
    return true;
}

/**
 * Check rate limit status
 */
export function getRateLimitStatus(
    identifier: string,
    maxRequests = 5,
    windowMs = 60000
): { remaining: number; resetIn: number } {
    const now = Date.now();
    const record = inMemoryStore.get(identifier);

    if (!record || now - record.timestamp > windowMs) {
        return { remaining: maxRequests, resetIn: 0 };
    }

    const remaining = Math.max(0, maxRequests - record.count);
    const resetIn = Math.max(0, windowMs - (now - record.timestamp));

    return { remaining, resetIn };
}
