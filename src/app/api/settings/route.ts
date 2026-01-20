import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const settings = await db.siteSettings.upsert({
            where: { id: "settings" },
            update: {
                bio: data.bio || null,
                bioAr: data.bioAr || null,
                cvUrl: data.cvUrl || null,
                email: data.email || null,
                github: data.github || null,
                linkedin: data.linkedin || null,
                twitter: data.twitter || null,
            },
            create: {
                id: "settings",
                bio: data.bio || null,
                bioAr: data.bioAr || null,
                cvUrl: data.cvUrl || null,
                email: data.email || null,
                github: data.github || null,
                linkedin: data.linkedin || null,
                twitter: data.twitter || null,
            },
        });

        return NextResponse.json({ success: true, settings });
    } catch (error) {
        console.error("Settings update error:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
