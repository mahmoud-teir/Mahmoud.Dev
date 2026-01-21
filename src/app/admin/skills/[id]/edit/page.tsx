import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditSkillForm } from "./edit-form";

type Props = {
    params: Promise<{ id: string }>;
};

async function getSkill(id: string) {
    const skill = await db.skill.findUnique({ where: { id } });
    if (!skill) notFound();
    return skill;
}

export default async function EditSkillPage({ params }: Props) {
    const { id } = await params;
    const skill = await getSkill(id);

    return (
        <div className="p-6">
            <EditSkillForm skill={skill} />
        </div>
    );
}
