import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const post = await db.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || null,
                content: data.content,
                tags: data.tags || [],
                image: data.imageUrl || null,
                readTime: data.readTime || null,
                status: data.status || "DRAFT",
                publishedAt: data.status === "PUBLISHED" ? new Date() : null,
            },
        });

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error("Create post error:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const existingPost = await db.blogPost.findUnique({ where: { id: data.id } });

        const post = await db.blogPost.update({
            where: { id: data.id },
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || null,
                content: data.content,
                tags: data.tags || [],
                image: data.imageUrl || null,
                readTime: data.readTime || null,
                status: data.status || "DRAFT",
                publishedAt:
                    data.status === "PUBLISHED" && !existingPost?.publishedAt
                        ? new Date()
                        : existingPost?.publishedAt,
            },
        });

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error("Update post error:", error);
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Post ID required" }, { status: 400 });
        }

        await db.blogPost.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete post error:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
