"use server";

import { db } from "@/lib/db";
import { blogPostSchema, type BlogPostInput } from "@/lib/validations/blog";
import { revalidatePath } from "next/cache";

export async function getBlogPosts(status?: "DRAFT" | "PUBLISHED") {
    const posts = await db.blogPost.findMany({
        where: status ? { status } : undefined,
        orderBy: { createdAt: "desc" },
    });
    return posts;
}

export async function getBlogPostBySlug(slug: string) {
    const post = await db.blogPost.findUnique({
        where: { slug },
    });
    return post;
}

export async function createBlogPost(data: BlogPostInput) {
    try {
        const validated = blogPostSchema.parse(data);
        const post = await db.blogPost.create({
            data: {
                ...validated,
                publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
            },
        });
        revalidatePath("/blog");
        revalidatePath("/admin/blog");
        return { success: true, post };
    } catch (error) {
        console.error("Create blog post error:", error);
        return { success: false, error: "Failed to create post" };
    }
}

export async function updateBlogPost(id: string, data: Partial<BlogPostInput>) {
    try {
        const post = await db.blogPost.update({
            where: { id },
            data,
        });
        revalidatePath("/blog");
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath("/admin/blog");
        return { success: true, post };
    } catch (error) {
        console.error("Update blog post error:", error);
        return { success: false, error: "Failed to update post" };
    }
}

export async function deleteBlogPost(id: string) {
    try {
        await db.blogPost.delete({ where: { id } });
        revalidatePath("/blog");
        revalidatePath("/admin/blog");
        return { success: true };
    } catch (error) {
        console.error("Delete blog post error:", error);
        return { success: false, error: "Failed to delete post" };
    }
}
