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

export default function NewTestimonialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        company: "",
        quote: "",
        imageUrl: "",
        featured: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Testimonial created successfully!");
                router.push("/admin/testimonials");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to create testimonial");
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
                <Link href="/admin/testimonials">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Testimonials
                </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-6">New Testimonial</h1>

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
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role *</label>
                            <Input
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                placeholder="CEO"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <Input
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="Acme Inc."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Photo URL</label>
                            <ImageUploader
                                value={formData.imageUrl}
                                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                endpoint="imageUploader"
                            />
                            <Input
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://example.com/photo.jpg"
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
                                placeholder="Working with Mahmoud was an amazing experience..."
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
                    {loading ? "Saving..." : "Create Testimonial"}
                </Button>
            </form>
        </div>
    );
}
