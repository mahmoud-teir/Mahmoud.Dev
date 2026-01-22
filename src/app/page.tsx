import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { ArrowRight, Download, Github, ExternalLink } from "lucide-react";

const skills = [
    { name: "Next.js", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Prisma", category: "Database" },
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "Tools" },
    { name: "Vercel", category: "Tools" },
];

async function getData() {
    // Current execution: Sequential to avoid connection pool timeouts on cold starts
    const settings = await db.siteSettings.findUnique({
        where: { id: "default" },
    });

    const projects = await db.project.findMany({
        where: { status: "PUBLISHED", featured: true },
        take: 3,
        orderBy: { order: "asc" },
    });

    const testimonials = await db.testimonial.findMany({
        where: { featured: true },
        take: 3,
        orderBy: { order: "asc" },
    });

    return [projects, testimonials, settings] as const;
}

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations();
    const [projects, testimonials, settings] = await getData();

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-20 md:py-32">
                <div className="container text-center">
                    <p className="text-primary font-medium mb-4">👋 {t("hero.greeting")}</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {t("hero.name")}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                        {t("hero.title")}
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        {t("hero.description")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
                        <Button asChild size="lg" className="w-full sm:w-auto">
                            <Link href="/projects">
                                {t("hero.cta")} <ArrowRight className="ms-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                            <Link href="/contact">{t("hero.contact")}</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 bg-muted/50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">{t("about.title")}</h2>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-lg text-muted-foreground mb-6">
                            {settings?.bio || t("about.description")}
                        </p>
                        {settings?.cvUrl && (
                            <Button variant="outline" asChild>
                                <a href={settings.cvUrl} download="Mahmoud_Teir_CV.pdf">
                                    <Download className="me-2 h-4 w-4" /> Download CV
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-16">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {t("projects.featured")}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Card key={project.id} className="overflow-hidden">
                                <div className="aspect-video bg-muted" />
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech: string) => (
                                            <Badge key={tech} variant="secondary">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        {project.liveUrl && (
                                            <Button size="sm" asChild>
                                                <Link href={project.liveUrl} target="_blank">
                                                    <ExternalLink className="me-1 h-3 w-3" /> {t("projects.liveDemo")}
                                                </Link>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={project.githubUrl} target="_blank">
                                                    <Github className="me-1 h-3 w-3" /> {t("projects.sourceCode")}
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Button variant="outline" asChild>
                            <Link href="/projects">
                                {t("projects.viewAll")} <ArrowRight className="ms-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-16 bg-muted/50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {t("skills.title")}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                        {skills.map((skill) => (
                            <Badge key={skill.name} variant="secondary" className="text-sm py-2 px-4">
                                {skill.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="py-16">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {t("testimonials.title")}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.id}>
                                    <CardContent className="p-6">
                                        <p className="text-muted-foreground mb-4 italic">
                                            &quot;{testimonial.quote}&quot;
                                        </p>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}
                                                {testimonial.company && `, ${testimonial.company}`}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
                    <p className="text-lg mb-8 opacity-90">
                        {t("cta.description")}
                    </p>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/contact">{t("cta.button")}</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
