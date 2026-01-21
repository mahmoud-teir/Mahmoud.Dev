"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/image-uploader";

type Certification = {
    id: string;
    name: string;
    nameAr: string | null;
    issuer: string;
    issuerAr: string | null;
    image: string | null;
    url: string | null;
    issueDate: Date;
    expiryDate: Date | null;
    order: number;
};

export function EditCertificationForm({ certification }: { certification: Certification }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: certification.name,
        nameAr: certification.nameAr || "",
        issuer: certification.issuer,
        issuerAr: certification.issuerAr || "",
        image: certification.image || "",
        url: certification.url || "",
        issueDate: certification.issueDate.toISOString().split("T")[0],
        expiryDate: certification.expiryDate?.toISOString().split("T")[0] || "",
        order: certification.order,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/certifications", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: certification.id, ...formData }),
            });

            if (res.ok) {
                toast.success("Certification updated successfully!");
                router.push("/admin/certifications");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update certification");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this certification?")) return;

        try {
            const res = await fetch(`/api/admin/certifications?id=${certification.id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Certification deleted successfully");
                router.push("/admin/certifications");
            } else {
                toast.error("Failed to delete certification");
            }
        } catch {
            toast.error("An error occurred");
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" asChild>
                    <Link href="/admin/certifications">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Certifications
                    </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
            </div>

            <h1 className="text-3xl font-bold mb-6">Edit Certification</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Certification Details</CardTitle>
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
                            <label className="text-sm font-medium">Issuer (English) *</label>
                            <Input
                                value={formData.issuer}
                                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Issuer (Arabic)</label>
                            <Input
                                value={formData.issuerAr}
                                onChange={(e) => setFormData({ ...formData, issuerAr: e.target.value })}
                                dir="rtl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Certificate Image/Logo</label>
                            <ImageUploader
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                                endpoint="imageUploader"
                            />
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Verification URL</label>
                            <Input
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Issue Date *</label>
                                <Input
                                    type="date"
                                    value={formData.issueDate}
                                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Expiry Date</label>
                                <Input
                                    type="date"
                                    value={formData.expiryDate}
                                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                />
                            </div>
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
                    {loading ? "Saving..." : "Update Certification"}
                </Button>
            </form>
        </>
    );
}
