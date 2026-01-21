import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
    params: Promise<{ locale: string }>;
};

type ExperienceType = {
    id: string;
    company: string;
    role: string;
    description: string | null;
    startDate: Date;
    endDate: Date | null;
    current: boolean;
};

async function getExperience() {
    return db.experience.findMany({
        orderBy: [{ current: "desc" }, { startDate: "desc" }],
    });
}

export default async function ExperiencePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("experience");
    const experiences = await getExperience();

    return (
        <div className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative border-s-2 border-primary/20 ps-8 ms-4">
                        {experiences.map((exp: ExperienceType, index: number) => (
                            <div key={exp.id} className={`relative pb-12 ${index === experiences.length - 1 ? "pb-0" : ""}`}>
                                {/* Timeline dot */}
                                <div className="absolute -start-[41px] w-4 h-4 bg-primary rounded-full border-4 border-background" />

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                            <h2 className="text-xl font-semibold">{exp.role}</h2>
                                            <span className="text-sm text-muted-foreground">
                                                {exp.startDate.toLocaleDateString(locale, { month: "short", year: "numeric" })}
                                                {" - "}
                                                {exp.current
                                                    ? t("present")
                                                    : exp.endDate?.toLocaleDateString(locale, { month: "short", year: "numeric" })}
                                            </span>
                                        </div>
                                        <p className="text-primary font-medium mb-3">{exp.company}</p>
                                        {exp.description && (
                                            <p className="text-muted-foreground">{exp.description}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
