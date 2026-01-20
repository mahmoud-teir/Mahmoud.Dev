import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditProjectForm } from "./edit-form";

type Props = {
    params: Promise<{ id: string }>;
};

async function getProject(id: string) {
    return db.project.findUnique({ where: { id } });
}

export default async function EditProjectPage({ params }: Props) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
            <EditProjectForm project={project} />
        </div>
    );
}
