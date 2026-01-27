import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, ExternalLink } from "lucide-react";

async function getProjects() {
    return db.project.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="h-4 w-4 mr-2" /> Add Project
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="py-12 text-center text-muted-foreground">
                            No projects found. Create your first project!
                        </CardContent>
                    </Card>
                ) : (
                    projects.map((project) => (
                        <Card key={project.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
                            <div className="p-6 flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg line-clamp-1" title={project.title}>
                                            {project.title}
                                        </h3>
                                        <Badge variant={project.status === "PUBLISHED" ? "default" : "secondary"}>
                                            {project.status.toLowerCase()}
                                        </Badge>
                                    </div>
                                    {project.featured && (
                                        <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">
                                            Featured
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <Badge key={tech} variant="secondary" className="px-2 py-0.5 text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                                            +{project.technologies.length - 4}
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Added on {new Date(project.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
                                {project.liveUrl ? (
                                    <Button variant="ghost" size="sm" asChild className="h-8">
                                        <Link href={project.liveUrl} target="_blank">
                                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Visit
                                        </Link>
                                    </Button>
                                ) : (
                                    <span />
                                )}
                                <Button variant="ghost" size="sm" asChild className="h-8">
                                    <Link href={`/admin/projects/${project.id}/edit`}>
                                        <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
