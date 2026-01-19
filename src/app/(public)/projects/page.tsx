import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore my portfolio of web development projects built with modern technologies.",
};

async function getProjects() {
    return db.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
}

type ProjectType = Awaited<ReturnType<typeof getProjects>>[number];

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">My Projects</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A collection of projects I&apos;ve worked on, showcasing my skills in web development.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <p className="text-center text-muted-foreground">No projects yet.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project: ProjectType) => (
                            <Card key={project.id} className="overflow-hidden group">
                                <div className="aspect-video bg-muted relative">
                                    {project.image && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="object-cover w-full h-full"
                                        />
                                    )}
                                </div>
                                <CardContent className="p-6">
                                    <Link href={`/projects/${project.slug}`}>
                                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
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
                                                    <ExternalLink className="mr-1 h-3 w-3" /> Live Demo
                                                </Link>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={project.githubUrl} target="_blank">
                                                    <Github className="mr-1 h-3 w-3" /> Source
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
