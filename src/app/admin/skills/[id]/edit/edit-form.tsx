"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

const categories = ["Frontend", "Backend", "Database", "Tools", "Mobile", "DevOps", "Other"];

type Skill = {
    id: string;
    name: string;
    nameAr: string | null;
    category: string;
    proficiency: number;
    icon: string | null;
    order: number;
};

export function EditSkillForm({ skill }: { skill: Skill }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: skill.name,
        nameAr: skill.nameAr || "",
        category: skill.category,
        proficiency: skill.proficiency,
        icon: skill.icon || "",
        order: skill.order,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/skills", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: skill.id, ...formData }),
            });

            if (res.ok) {
                toast.success("Skill updated successfully!");
                router.push("/admin/skills");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update skill");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this skill?")) return;

        try {
            const res = await fetch(`/api/admin/skills?id=${skill.id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Skill deleted successfully");
                router.push("/admin/skills");
            } else {
                toast.error("Failed to delete skill");
            }
        } catch {
            toast.error("An error occurred");
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" asChild>
                    <Link href="/admin/skills">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Skills
                    </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
            </div>

            <h1 className="text-3xl font-bold mb-6">Edit Skill</h1>

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
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name (Arabic)</label>
                            <Input
                                value={formData.nameAr}
                                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
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
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Display Order</label>
                            <Input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" disabled={loading} size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Update Skill"}
                </Button>
            </form>
        </>
    );
}
