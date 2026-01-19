import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Read my latest articles about web development, tutorials, and insights.",
};

async function getPosts() {
    return db.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
    });
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Blog</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights about web development.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <p className="text-center text-muted-foreground">No posts yet.</p>
                ) : (
                    <div className="max-w-3xl mx-auto space-y-8">
                        {posts.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                <div className="md:flex">
                                    {post.image && (
                                        <div className="md:w-1/3">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover w-full h-48 md:h-full"
                                            />
                                        </div>
                                    )}
                                    <CardContent className={`p-6 ${post.image ? "md:w-2/3" : "w-full"}`}>
                                        <Link href={`/blog/${post.slug}`}>
                                            <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                                                {post.title}
                                            </h2>
                                        </Link>
                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {post.publishedAt?.toLocaleDateString()}
                                            </span>
                                            {post.readTime && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {post.readTime} min read
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {post.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
