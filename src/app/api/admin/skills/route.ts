"use server";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all skills
export async function GET() {
    try {
        const skills = await db.skill.findMany({
            orderBy: [{ category: "asc" }, { order: "asc" }],
        });
        return NextResponse.json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}

// POST create skill
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, nameAr, category, proficiency, icon, order } = body;

        if (!name || !category) {
            return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
        }

        const skill = await db.skill.create({
            data: {
                name,
                nameAr,
                category,
                proficiency: proficiency || 80,
                icon,
                order: order || 0,
            },
        });

        return NextResponse.json(skill, { status: 201 });
    } catch (error) {
        console.error("Error creating skill:", error);
        return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
    }
}

// PUT update skill
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, nameAr, category, proficiency, icon, order } = body;

        if (!id) {
            return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
        }

        const skill = await db.skill.update({
            where: { id },
            data: {
                name,
                nameAr,
                category,
                proficiency,
                icon,
                order,
            },
        });

        return NextResponse.json(skill);
    } catch (error) {
        console.error("Error updating skill:", error);
        return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
    }
}

// DELETE skill
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
        }

        await db.skill.delete({ where: { id } });
        return NextResponse.json({ message: "Skill deleted successfully" });
    } catch (error) {
        console.error("Error deleting skill:", error);
        return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
    }
}
