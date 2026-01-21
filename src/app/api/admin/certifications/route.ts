"use server";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all certifications
export async function GET() {
    try {
        const certifications = await db.certification.findMany({
            orderBy: [{ issueDate: "desc" }, { order: "asc" }],
        });
        return NextResponse.json(certifications);
    } catch (error) {
        console.error("Error fetching certifications:", error);
        return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 });
    }
}

// POST create certification
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, nameAr, issuer, issuerAr, image, url, issueDate, expiryDate, order } = body;

        if (!name || !issuer || !issueDate) {
            return NextResponse.json({ error: "Name, issuer, and issue date are required" }, { status: 400 });
        }

        const certification = await db.certification.create({
            data: {
                name,
                nameAr,
                issuer,
                issuerAr,
                image,
                url,
                issueDate: new Date(issueDate),
                expiryDate: expiryDate ? new Date(expiryDate) : null,
                order: order || 0,
            },
        });

        return NextResponse.json(certification, { status: 201 });
    } catch (error) {
        console.error("Error creating certification:", error);
        return NextResponse.json({ error: "Failed to create certification" }, { status: 500 });
    }
}

// PUT update certification
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, nameAr, issuer, issuerAr, image, url, issueDate, expiryDate, order } = body;

        if (!id) {
            return NextResponse.json({ error: "Certification ID is required" }, { status: 400 });
        }

        const certification = await db.certification.update({
            where: { id },
            data: {
                name,
                nameAr,
                issuer,
                issuerAr,
                image,
                url,
                issueDate: issueDate ? new Date(issueDate) : undefined,
                expiryDate: expiryDate ? new Date(expiryDate) : null,
                order,
            },
        });

        return NextResponse.json(certification);
    } catch (error) {
        console.error("Error updating certification:", error);
        return NextResponse.json({ error: "Failed to update certification" }, { status: 500 });
    }
}

// DELETE certification
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Certification ID is required" }, { status: 400 });
        }

        await db.certification.delete({ where: { id } });
        return NextResponse.json({ message: "Certification deleted successfully" });
    } catch (error) {
        console.error("Error deleting certification:", error);
        return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
    }
}
