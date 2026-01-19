"use server";

import { db } from "@/lib/db";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import { revalidatePath } from "next/cache";

export async function getProjects(status?: "DRAFT" | "PUBLISHED") {
    const projects = await db.project.findMany({
        where: status ? { status } : undefined,
        orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
    return projects;
}

export async function getProjectBySlug(slug: string) {
    const project = await db.project.findUnique({
        where: { slug },
    });
    return project;
}

export async function createProject(data: ProjectInput) {
    try {
        const validated = projectSchema.parse(data);
        const project = await db.project.create({
            data: validated,
        });
        revalidatePath("/projects");
        revalidatePath("/admin/projects");
        return { success: true, project };
    } catch (error) {
        console.error("Create project error:", error);
        return { success: false, error: "Failed to create project" };
    }
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
    try {
        const project = await db.project.update({
            where: { id },
            data,
        });
        revalidatePath("/projects");
        revalidatePath(`/projects/${project.slug}`);
        revalidatePath("/admin/projects");
        return { success: true, project };
    } catch (error) {
        console.error("Update project error:", error);
        return { success: false, error: "Failed to update project" };
    }
}

export async function deleteProject(id: string) {
    try {
        await db.project.delete({ where: { id } });
        revalidatePath("/projects");
        revalidatePath("/admin/projects");
        return { success: true };
    } catch (error) {
        console.error("Delete project error:", error);
        return { success: false, error: "Failed to delete project" };
    }
}
