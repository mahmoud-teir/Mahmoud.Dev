import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Star } from "lucide-react";

async function getTestimonials() {
    return db.testimonial.findMany({
        orderBy: { order: "asc" },
    });
}

export default async function AdminTestimonialsPage() {
    const testimonials = await getTestimonials();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Testimonials</h1>
                <Button asChild>
                    <Link href="/admin/testimonials/new">
                        <Plus className="h-4 w-4 mr-2" /> Add Testimonial
                    </Link>
                </Button>
            </div>

            {testimonials.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No testimonials yet. Add your first client testimonial!
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold">{testimonial.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {testimonial.role}
                                            {testimonial.company && ` at ${testimonial.company}`}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {testimonial.featured && (
                                            <Badge variant="secondary">
                                                <Star className="h-3 w-3 mr-1" /> Featured
                                            </Badge>
                                        )}
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-muted-foreground italic">
                                    &quot;{testimonial.quote}&quot;
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
