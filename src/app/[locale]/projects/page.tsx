import { db } from "@/lib/db";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsGrid } from "@/components/projects-grid";

type Props = {
    params: Promise<{ locale: string }>;
};

async function getProjects() {
    return db.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { order: "asc" }],
    });
}

export default async function ProjectsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("projects");
    const projects = await getProjects();

    return (
        <div className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <ProjectsGrid projects={projects} />
            </div>
        </div>
    );
}
