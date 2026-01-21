"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

type Certification = {
    id: string;
    name: string;
    nameAr: string | null;
    issuer: string;
    issuerAr: string | null;
    image: string | null;
    url: string | null;
    issueDate: string;
    expiryDate: string | null;
    order: number;
};

export default function AdminCertificationsPage() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const res = await fetch("/api/admin/certifications");
            if (res.ok) {
                const data = await res.json();
                setCertifications(data);
            }
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCertification = async (id: string) => {
        if (!confirm("Are you sure you want to delete this certification?")) return;

        try {
            const res = await fetch(`/api/admin/certifications?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Certification deleted successfully");
                fetchCertifications();
            } else {
                toast.error("Failed to delete certification");
            }
        } catch {
            toast.error("An error occurred");
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Certifications</h1>
                <Button asChild>
                    <Link href="/admin/certifications/new">
                        <Plus className="h-4 w-4 mr-2" /> Add Certification
                    </Link>
                </Button>
            </div>

            {certifications.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No certifications found. Add your first certification!
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {certifications.map((cert) => (
                        <Card key={cert.id} className="overflow-hidden">
                            {cert.image && (
                                <div className="h-32 bg-muted flex items-center justify-center">
                                    <img
                                        src={cert.image}
                                        alt={cert.name}
                                        className="max-h-full max-w-full object-contain p-4"
                                    />
                                </div>
                            )}
                            <CardContent className="p-4">
                                <h3 className="font-semibold mb-1">{cert.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                                <p className="text-xs text-muted-foreground">
                                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                                    {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                                </p>
                                <div className="flex gap-2 mt-4">
                                    {cert.url && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-3 w-3 mr-1" /> View
                                            </a>
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/certifications/${cert.id}/edit`}>
                                            <Edit className="h-3 w-3 mr-1" /> Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteCertification(cert.id)}
                                    >
                                        <Trash2 className="h-3 w-3 mr-1 text-destructive" /> Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
