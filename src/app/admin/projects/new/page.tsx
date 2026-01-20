"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/image-uploader";

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        imageUrl: "",
        featured: false,
        status: "DRAFT",
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
                }),
            });

            if (res.ok) {
                toast.success("Project created successfully!");
                router.push("/admin/projects");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to create project");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <Button variant="ghost" asChild className="mb-6">
                <Link href="/admin/projects">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Projects
                </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-6">New Project</h1>

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
                                onChange={handleTitleChange}
                                placeholder="My Awesome Project"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <Input
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="my-awesome-project"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="A brief description of the project..."
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
                                placeholder="<p>Detailed project description...</p>"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Technologies (comma-separated)</label>
                            <Input
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                placeholder="React, Next.js, TypeScript, Tailwind CSS"
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
                            <ImageUploader
                                value={formData.imageUrl}
                                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                endpoint="imageUploader"
                            />
                            <Input
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://example.com/project-image.jpg"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Live Demo URL</label>
                            <Input
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                placeholder="https://myproject.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">GitHub URL</label>
                            <Input
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                placeholder="https://github.com/username/repo"
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
                                Featured project (show on homepage)
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
                    {loading ? "Saving..." : "Create Project"}
                </Button>
            </form>
        </div>
    );
}
