import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditTestimonialForm } from "./edit-form";

type Props = {
    params: Promise<{ id: string }>;
};

async function getTestimonial(id: string) {
    return db.testimonial.findUnique({ where: { id } });
}

export default async function EditTestimonialPage({ params }: Props) {
    const { id } = await params;
    const testimonial = await getTestimonial(id);

    if (!testimonial) {
        notFound();
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Testimonial</h1>
            <EditTestimonialForm testimonial={testimonial} />
        </div>
    );
}
