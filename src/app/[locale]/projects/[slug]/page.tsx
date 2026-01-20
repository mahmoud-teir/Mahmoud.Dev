import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

async function getProject(slug: string) {
    return db.project.findUnique({
        where: { slug, status: "PUBLISHED" },
    });
}

async function getRelatedProjects(projectId: string, technologies: string[]) {
    return db.project.findMany({
        where: {
            id: { not: projectId },
            status: "PUBLISHED",
            technologies: { hasSome: technologies },
        },
        take: 3,
    });
}

export default async function ProjectDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("projects");
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    const relatedProjects = await getRelatedProjects(project.id, project.technologies);

    return (
        <div className="py-16">
            <div className="container max-w-4xl">
                {/* Back Button */}
                <Button variant="ghost" asChild className="mb-8">
                    <Link href="/projects">
                        <ArrowLeft className="h-4 w-4 me-2" />
                        {t("viewAll")}
                    </Link>
                </Button>

                {/* Project Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(project.createdAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "long",
                        })}
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                    <p className="text-xl text-muted-foreground">{project.description}</p>
                </div>

                {/* Project Image */}
                {project.image && (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Technologies */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">Technologies</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-sm py-1 px-3">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Content */}
                {project.content && (
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                        <div dangerouslySetInnerHTML={{ __html: project.content }} />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mb-12">
                    {project.liveUrl && (
                        <Button size="lg" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 me-2" />
                                {t("liveDemo")}
                            </a>
                        </Button>
                    )}
                    {project.githubUrl && (
                        <Button size="lg" variant="outline" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 me-2" />
                                {t("sourceCode")}
                            </a>
                        </Button>
                    )}
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {relatedProjects.map((related) => (
                                <Card key={related.id}>
                                    <CardContent className="p-4">
                                        <Link href={`/projects/${related.slug}`}>
                                            <h3 className="font-semibold hover:text-primary transition-colors">
                                                {related.title}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                            {related.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
