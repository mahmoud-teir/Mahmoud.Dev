"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = ["Frontend", "Backend", "Database", "Tools", "Mobile", "DevOps", "Other"];

export default function NewSkillPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        nameAr: "",
        category: "Frontend",
        proficiency: 80,
        icon: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/skills", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Skill created successfully!");
                router.push("/admin/skills");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to create skill");
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
                <Link href="/admin/skills">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Skills
                </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-6">New Skill</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name (English) *</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="React"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name (Arabic)</label>
                            <Input
                                value={formData.nameAr}
                                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                                placeholder="ريأكت"
                                dir="rtl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Proficiency: {formData.proficiency}%</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={formData.proficiency}
                                onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                                className="w-full"
                            />
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all"
                                    style={{ width: `${formData.proficiency}%` }}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Icon (optional)</label>
                            <Input
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                placeholder="https://example.com/icon.svg or icon-name"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" disabled={loading} size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Create Skill"}
                </Button>
            </form>
        </div>
    );
}
