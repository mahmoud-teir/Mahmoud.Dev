"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { ProjectFilter } from "@/components/project-filter";

type Project = {
    id: string;
    slug: string;
    title: string;
    description: string;
    technologies: string[];
    liveUrl: string | null;
    githubUrl: string | null;
    image: string | null;
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
    const t = useTranslations("projects");
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    // Get unique technologies from all projects
    const allTechnologies = useMemo(() => {
        const techSet = new Set<string>();
        projects.forEach((p) => p.technologies.forEach((t) => techSet.add(t)));
        return Array.from(techSet).sort();
    }, [projects]);

    // Filter projects by selected technology
    const filteredProjects = useMemo(() => {
        if (!selectedTech) return projects;
        return projects.filter((p) => p.technologies.includes(selectedTech));
    }, [projects, selectedTech]);

    return (
        <>
            {allTechnologies.length > 0 && (
                <ProjectFilter
                    technologies={allTechnologies}
                    selectedTech={selectedTech}
                    onFilterChange={setSelectedTech}
                />
            )}

            {filteredProjects.length === 0 ? (
                <p className="text-center text-muted-foreground">{t("noProjects")}</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                            <div className="aspect-video bg-muted">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
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
                                        <Badge
                                            key={tech}
                                            variant={selectedTech === tech ? "default" : "secondary"}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedTech(tech)}
                                        >
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
        </>
    );
}
