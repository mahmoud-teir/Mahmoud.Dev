import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditCertificationForm } from "./edit-form";

type Props = {
    params: Promise<{ id: string }>;
};

async function getCertification(id: string) {
    const certification = await db.certification.findUnique({ where: { id } });
    if (!certification) notFound();
    return certification;
}

export default async function EditCertificationPage({ params }: Props) {
    const { id } = await params;
    const certification = await getCertification(id);

    return (
        <div className="p-6">
            <EditCertificationForm certification={certification} />
        </div>
    );
}
