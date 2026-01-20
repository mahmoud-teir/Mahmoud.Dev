import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditBlogPostForm } from "./edit-form";

type Props = {
    params: Promise<{ id: string }>;
};

async function getPost(id: string) {
    return db.blogPost.findUnique({ where: { id } });
}

export default async function EditBlogPostPage({ params }: Props) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
            <EditBlogPostForm post={post} />
        </div>
    );
}
