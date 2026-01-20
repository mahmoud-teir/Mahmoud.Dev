import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead>Technologies</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                    No projects found. Create your first project!
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={project.status === "PUBLISHED" ? "default" : "secondary"}>
                                            {project.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {project.featured ? (
                                            <Badge variant="outline">Featured</Badge>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1 flex-wrap">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <Badge key={tech} variant="secondary" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{project.technologies.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/projects/${project.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            {project.liveUrl && (
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={project.liveUrl} target="_blank">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
