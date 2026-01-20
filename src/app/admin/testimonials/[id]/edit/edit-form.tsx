"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

type Testimonial = {
    id: string;
    name: string;
    role: string;
    company: string | null;
    quote: string;
    image: string | null;
    featured: boolean;
};

export function EditTestimonialForm({ testimonial }: { testimonial: Testimonial }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company || "",
        quote: testimonial.quote,
        imageUrl: testimonial.image || "",
        featured: testimonial.featured,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/testimonials", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: testimonial.id,
                    ...formData,
                }),
            });

            if (res.ok) {
                toast.success("Testimonial updated successfully!");
                router.push("/admin/testimonials");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update testimonial");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/admin/testimonials?id=${testimonial.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Testimonial deleted!");
                router.push("/admin/testimonials");
            } else {
                toast.error("Failed to delete testimonial");
            }
        } catch {
            toast.error("An error occurred");
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" asChild>
                    <Link href="/admin/testimonials">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Testimonials
                    </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Client Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name *</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role *</label>
                            <Input
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <Input
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Photo URL</label>
                            <Input
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Testimonial</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Quote *</label>
                            <textarea
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                rows={4}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="h-4 w-4"
                            />
                            <label htmlFor="featured" className="text-sm font-medium">
                                Featured (show on homepage)
                            </label>
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
