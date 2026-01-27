"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

type Settings = {
    id: string;
    bio: string | null;
    bioAr: string | null;
    cvUrl: string | null;
    email: string | null;
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
};

export function SettingsForm({ settings }: { settings: Settings }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        bio: settings.bio || "",
        bioAr: settings.bioAr || "",
        cvUrl: settings.cvUrl || "",
        email: settings.email || "",
        github: settings.github || "",
        linkedin: settings.linkedin || "",
        twitter: settings.twitter || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Settings saved successfully!");
                router.refresh();
            } else {
                toast.error("Failed to save settings");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Your personal information displayed on the site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bio (English)</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows={6}
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="Write a short bio about yourself..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bio (Arabic)</label>
                            <textarea
                                value={formData.bioAr}
                                onChange={(e) => setFormData({ ...formData, bioAr: e.target.value })}
                                rows={6}
                                dir="rtl"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="اكتب نبذة عن نفسك..."
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Contact Email</label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">CV</label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.cvUrl}
                                    onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                                    placeholder="https://example.com/cv.pdf"
                                />
                                {formData.cvUrl && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => window.open(formData.cvUrl, "_blank")}
                                    >
                                        <Save className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <div className="mt-2">
                                <UploadDropzone
                                    endpoint="cvUploader"
                                    onClientUploadComplete={(res: any) => {
                                        if (res && res[0]) {
                                            setFormData({ ...formData, cvUrl: res[0].url });
                                            toast.success("CV uploaded successfully!");
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(`Error uploading CV: ${error.message}`);
                                    }}
                                    className="ut-label:text-primary ut-button:bg-primary ut-button:ut-readying:bg-primary/50"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Your social media profiles</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">GitHub</label>
                            <Input
                                value={formData.github}
                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                placeholder="https://github.com/username"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">LinkedIn</label>
                            <Input
                                value={formData.linkedin}
                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Twitter / X</label>
                            <Input
                                value={formData.twitter}
                                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                placeholder="https://twitter.com/username"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={loading} size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}
