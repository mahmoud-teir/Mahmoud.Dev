import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { Download, ExternalLink, Award, Briefcase } from "lucide-react";

type Props = {
    params: Promise<{ locale: string }>;
};

async function getData() {
    const [skills, certifications, experiences, settings] = await Promise.all([
        db.skill.findMany({
            orderBy: [{ category: "asc" }, { order: "asc" }],
        }),
        db.certification.findMany({
            orderBy: [{ issueDate: "desc" }, { order: "asc" }],
        }),
        db.experience.findMany({
            orderBy: [{ current: "desc" }, { startDate: "desc" }],
        }),
        db.siteSettings.findUnique({ where: { id: "settings" } }),
    ]);
    return { skills, certifications, experiences, settings };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations();
    const { skills, certifications, experiences, settings } = await getData();
    const isAr = locale === "ar";

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div className="py-16">
            <div className="container">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("about.title")}</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                        {isAr ? settings?.bioAr || settings?.bio : settings?.bio || t("about.description")}
                    </p>
                    {settings?.cvUrl && (
                        <Button asChild size="lg">
                            <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="me-2 h-4 w-4" />
                                {isAr ? "تحميل السيرة الذاتية" : "Download CV"}
                            </a>
                        </Button>
                    )}
                </div>

                {/* Skills Section */}
                {skills.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            {isAr ? "المهارات التقنية" : "Technical Skills"}
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2">
                            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                                <Card key={category}>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-4">{category}</h3>
                                        <div className="space-y-4">
                                            {categorySkills.map((skill) => (
                                                <div key={skill.id}>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-medium">
                                                            {isAr && skill.nameAr ? skill.nameAr : skill.name}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {skill.proficiency}%
                                                        </span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary transition-all duration-1000"
                                                            style={{ width: `${skill.proficiency}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications Section */}
                {certifications.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            <Award className="inline-block me-2 h-8 w-8" />
                            {isAr ? "الشهادات والدورات" : "Certifications & Courses"}
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {certifications.map((cert) => (
                                <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                                        <h3 className="font-semibold mb-1">
                                            {isAr && cert.nameAr ? cert.nameAr : cert.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {isAr && cert.issuerAr ? cert.issuerAr : cert.issuer}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="secondary">
                                                {cert.issueDate.toLocaleDateString(locale, { year: "numeric", month: "short" })}
                                            </Badge>
                                            {cert.url && (
                                                <Button variant="ghost" size="sm" asChild>
                                                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-3 w-3 me-1" />
                                                        {isAr ? "تحقق" : "Verify"}
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience Timeline */}
                {experiences.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold text-center mb-8">
                            <Briefcase className="inline-block me-2 h-8 w-8" />
                            {isAr ? "الخبرة العملية" : "Work Experience"}
                        </h2>
                        <div className="max-w-3xl mx-auto">
                            <div className="relative border-s-2 border-primary/20 ps-8 ms-4">
                                {experiences.map((exp, index) => (
                                    <div key={exp.id} className={`relative pb-12 ${index === experiences.length - 1 ? "pb-0" : ""}`}>
                                        {/* Timeline dot */}
                                        <div className="absolute -start-[41px] w-4 h-4 bg-primary rounded-full border-4 border-background" />

                                        <Card className="hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                                    <h3 className="text-xl font-semibold">
                                                        {isAr && exp.roleAr ? exp.roleAr : exp.role}
                                                    </h3>
                                                    <Badge variant="outline">
                                                        {exp.startDate.toLocaleDateString(locale, { month: "short", year: "numeric" })}
                                                        {" - "}
                                                        {exp.current
                                                            ? (isAr ? "الحالي" : "Present")
                                                            : exp.endDate?.toLocaleDateString(locale, { month: "short", year: "numeric" })}
                                                    </Badge>
                                                </div>
                                                <p className="text-primary font-medium mb-3">
                                                    {isAr && exp.companyAr ? exp.companyAr : exp.company}
                                                </p>
                                                {exp.description && (
                                                    <p className="text-muted-foreground">
                                                        {isAr && exp.descriptionAr ? exp.descriptionAr : exp.description}
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <div className="text-center mt-16">
                    <Button asChild size="lg">
                        <Link href="/contact">
                            {isAr ? "تواصل معي" : "Get In Touch"}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
