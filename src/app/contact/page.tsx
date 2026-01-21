"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitContactForm } from "@/actions/contact";
import { toast } from "sonner";
import { Mail, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
    const t = useTranslations("contact");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            const data = {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                subject: formData.get("subject") as string,
                message: formData.get("message") as string,
            };

            const result = await submitContactForm(data);

            if (result.success) {
                toast.success(t("form.success"));
                (document.getElementById("contact-form") as HTMLFormElement)?.reset();
            } else {
                toast.error(result.error || t("form.error"));
            }
        } catch {
            toast.error(t("form.error"));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <Card>
                        <CardContent className="p-6">
                            <form id="contact-form" action={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        {t("form.name")}
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder={t("form.namePlaceholder")}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        {t("form.email")}
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={t("form.emailPlaceholder")}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">
                                        {t("form.subject")}
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder={t("form.subjectPlaceholder")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        {t("form.message")}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder={t("form.messagePlaceholder")}
                                        required
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? t("form.sending") : t("form.submit")}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    {t("info.email")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <a href="mailto:mahmoudteirbusiness@gmail.com" className="text-primary hover:underline">
                                    mahmoudteirbusiness@gmail.com
                                </a>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    {t("info.location")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Palestine</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    {t("info.social")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-4">
                                <a href="https://github.com" target="_blank" className="text-primary hover:underline">
                                    GitHub
                                </a>
                                <a href="https://linkedin.com" target="_blank" className="text-primary hover:underline">
                                    LinkedIn
                                </a>
                                <a href="https://twitter.com" target="_blank" className="text-primary hover:underline">
                                    Twitter
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
