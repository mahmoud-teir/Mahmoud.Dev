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

export default function NewCertificationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        nameAr: "",
        issuer: "",
        issuerAr: "",
        image: "",
        url: "",
        issueDate: "",
        expiryDate: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/certifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Certification created successfully!");
                router.push("/admin/certifications");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to create certification");
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
                <Link href="/admin/certifications">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Certifications
                </Link>
            </Button>

            <h1 className="text-3xl font-bold mb-6">New Certification</h1>

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
                                placeholder="AWS Solutions Architect"
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
                                placeholder="Amazon Web Services"
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
                                placeholder="https://example.com/cert-logo.png"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Verification URL</label>
                            <Input
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                placeholder="https://verify.example.com/cert/12345"
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
                    </CardContent>
                </Card>

                <Button type="submit" disabled={loading} size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Create Certification"}
                </Button>
            </form>
        </div>
    );
}
