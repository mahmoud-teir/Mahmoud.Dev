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

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        tags: "",
        imageUrl: "",
        readTime: "",
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
            const res = await fetch("/api/admin/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
                    readTime: formData.readTime ? parseInt(formData.readTime) : null,
                }),
            });

            if (res.ok) {
                toast.success("Blog post created successfully!");
                router.push("/admin/blog");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to create post");
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
                <Link href="/admin/blog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-6">New Blog Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Post Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title *</label>
                            <Input
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="My Amazing Blog Post"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <Input
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="my-amazing-blog-post"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={2}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="A short summary of the post..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Content (HTML) *</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={15}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                                placeholder="<p>Your blog post content...</p>"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tags (comma-separated)</label>
                                <Input
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="React, Tutorial, Web Development"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Read Time (minutes)</label>
                                <Input
                                    type="number"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    placeholder="5"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Media & Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Featured Image URL</label>
                            <ImageUploader
                                value={formData.imageUrl}
                                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                endpoint="imageUploader"
                            />
                            <Input
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://example.com/post-image.jpg"
                            />
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
                    {loading ? "Saving..." : "Create Post"}
                </Button>
            </form>
        </div>
    );
}
