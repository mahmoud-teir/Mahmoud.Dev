import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const project = await db.project.create({
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                content: data.content || null,
                technologies: data.technologies || [],
                image: data.imageUrl || null,
                liveUrl: data.liveUrl || null,
                githubUrl: data.githubUrl || null,
                featured: data.featured || false,
                status: data.status || "DRAFT",
            },
        });

        return NextResponse.json({ success: true, project });
    } catch (error) {
        console.error("Create project error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const project = await db.project.update({
            where: { id: data.id },
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                content: data.content || null,
                technologies: data.technologies || [],
                image: data.imageUrl || null,
                liveUrl: data.liveUrl || null,
                githubUrl: data.githubUrl || null,
                featured: data.featured || false,
                status: data.status || "DRAFT",
            },
        });

        return NextResponse.json({ success: true, project });
    } catch (error) {
        console.error("Update project error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Project ID required" }, { status: 400 });
        }

        await db.project.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete project error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
