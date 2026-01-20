"use server";

import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { simpleRateLimit } from "@/lib/rate-limit";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function submitContactForm(data: ContactInput) {
    try {
        // Get IP for rate limiting
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for") || "anonymous";

        // Check rate limit (5 submissions per minute)
        const allowed = simpleRateLimit(`contact:${ip}`, 5, 60000);
        if (!allowed) {
            return { success: false, error: "Too many requests. Please try again later." };
        }

        // Validate input
        const validated = contactSchema.parse(data);

        // Basic spam check - honeypot or suspicious content
        if (validated.message.includes("<script>") || validated.message.includes("href=")) {
            return { success: false, error: "Invalid message content" };
        }

        // Save to database
        const message = await db.contactMessage.create({
            data: validated,
        });

        // Send email notification
        await sendEmail({
            to: process.env.ADMIN_EMAIL || "mahmoudteirbusiness@gmail.com",
            subject: `New Contact: ${validated.subject || "No Subject"}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Subject:</strong> ${validated.subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${validated.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      `,
        });

        revalidatePath("/admin/messages");

        return { success: true, message };
    } catch (error) {
        console.error("Contact form error:", error);
        return { success: false, error: "Failed to submit form" };
    }
}
