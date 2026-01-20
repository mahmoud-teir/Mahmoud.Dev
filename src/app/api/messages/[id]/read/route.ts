import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    await db.contactMessage.update({
        where: { id },
        data: { read: true },
    });

    return NextResponse.json({ success: true });
}
