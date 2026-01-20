"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

type Project = {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string | null;
    technologies: string[];
    image: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    featured: boolean;
    status: string;
};

export function EditProjectForm({ project }: { project: Project }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: project.title,
        slug: project.slug,
        description: project.description,
        content: project.content || "",
        technologies: project.technologies.join(", "),
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        imageUrl: project.image || "",
        featured: project.featured,
        status: project.status,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/projects", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: project.id,
                    ...formData,
                    technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
                }),
            });

            if (res.ok) {
                toast.success("Project updated successfully!");
                router.push("/admin/projects");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update project");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/admin/projects?id=${project.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Project deleted!");
                router.push("/admin/projects");
            } else {
                toast.error("Failed to delete project");
            }
        } catch {
            toast.error("An error occurred");
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" asChild>
                    <Link href="/admin/projects">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Projects
                    </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title *</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <Input
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Content (HTML)</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={8}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Technologies (comma-separated)</label>
                            <Input
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Links & Media</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Live Demo URL</label>
                            <Input
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">GitHub URL</label>
                            <Input
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="h-4 w-4"
                            />
                            <label htmlFor="featured" className="text-sm font-medium">
                                Featured project
                            </label>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" disabled={loading} size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </>
    );
}
