import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const testimonial = await db.testimonial.create({
            data: {
                name: data.name,
                role: data.role,
                company: data.company || null,
                quote: data.quote,
                image: data.imageUrl || null,
                featured: data.featured || false,
            },
        });

        return NextResponse.json({ success: true, testimonial });
    } catch (error) {
        console.error("Create testimonial error:", error);
        return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const testimonial = await db.testimonial.update({
            where: { id: data.id },
            data: {
                name: data.name,
                role: data.role,
                company: data.company || null,
                quote: data.quote,
                image: data.imageUrl || null,
                featured: data.featured || false,
            },
        });

        return NextResponse.json({ success: true, testimonial });
    } catch (error) {
        console.error("Update testimonial error:", error);
        return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await db.testimonial.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete testimonial error:", error);
        return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
    }
}
