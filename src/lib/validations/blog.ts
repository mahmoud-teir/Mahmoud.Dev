import { z } from "zod";

export const blogPostSchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    title: z.string().min(1, "Title is required"),
    titleAr: z.string().optional(),
    excerpt: z.string().optional(),
    excerptAr: z.string().optional(),
    content: z.string().min(1, "Content is required"),
    contentAr: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    readTime: z.number().optional(),
    status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
    publishedAt: z.date().optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
