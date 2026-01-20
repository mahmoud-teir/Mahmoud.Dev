import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

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

                {projects.length === 0 ? (
                    <p className="text-center text-muted-foreground">{t("noProjects")}</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Card key={project.id} className="overflow-hidden">
                                <div className="aspect-video bg-muted" />
                                <CardContent className="p-6">
                                    <Link href={`/projects/${project.slug}`}>
                                        <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                                            {project.title}
                                        </h2>
                                    </Link>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 4).map((tech: string) => (
                                            <Badge key={tech} variant="secondary">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        {project.liveUrl && (
                                            <Button size="sm" asChild>
                                                <Link href={project.liveUrl} target="_blank">
                                                    <ExternalLink className="me-1 h-3 w-3" /> {t("liveDemo")}
                                                </Link>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={project.githubUrl} target="_blank">
                                                    <Github className="me-1 h-3 w-3" /> {t("sourceCode")}
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
