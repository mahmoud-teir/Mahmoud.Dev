import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experience",
    description: "My professional journey and work experience as a Full-Stack Developer.",
};

async function getExperience() {
    return db.experience.findMany({
        orderBy: [{ current: "desc" }, { startDate: "desc" }],
    });
}

type ExperienceType = Awaited<ReturnType<typeof getExperience>>[number];

export default async function ExperiencePage() {
    const experiences = await getExperience();

    return (
        <div className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Work Experience</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        My professional journey and the companies I&apos;ve worked with.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative border-l-2 border-primary/20 pl-8 ml-4">
                        {experiences.map((exp: ExperienceType, index: number) => (
                            <div key={exp.id} className={`relative pb-12 ${index === experiences.length - 1 ? "pb-0" : ""}`}>
                                {/* Timeline dot */}
                                <div className="absolute -left-[41px] w-4 h-4 bg-primary rounded-full border-4 border-background" />

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                            <h2 className="text-xl font-semibold">{exp.role}</h2>
                                            <span className="text-sm text-muted-foreground">
                                                {exp.startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                                {" - "}
                                                {exp.current
                                                    ? "Present"
                                                    : exp.endDate?.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
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
