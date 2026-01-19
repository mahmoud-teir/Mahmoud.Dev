import { z } from "zod";

export const projectSchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    title: z.string().min(1, "Title is required"),
    titleAr: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    descriptionAr: z.string().optional(),
    content: z.string().optional(),
    contentAr: z.string().optional(),
    image: z.string().optional(),
    images: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional().or(z.literal("")),
    githubUrl: z.string().url().optional().or(z.literal("")),
    featured: z.boolean().default(false),
    status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
    order: z.number().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
