import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit } from "lucide-react";

async function getBlogPosts() {
    return db.blogPost.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export default async function AdminBlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <Button asChild>
                    <Link href="/admin/blog/new">
                        <Plus className="h-4 w-4 mr-2" /> New Post
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="py-12 text-center text-muted-foreground">
                            No blog posts found. Write your first post!
                        </CardContent>
                    </Card>
                ) : (
                    posts.map((post) => (
                        <Card key={post.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
                            <div className="p-6 flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="font-semibold text-lg line-clamp-2" title={post.title}>
                                        {post.title}
                                    </h3>
                                    <Badge variant={post.status === "PUBLISHED" ? "default" : "secondary"}>
                                        {post.status.toLowerCase()}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                                    {post.publishedAt && (
                                        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 border-t bg-muted/20 flex justify-end">
                                <Button variant="ghost" size="sm" asChild className="h-8">
                                    <Link href={`/admin/blog/${post.id}/edit`}>
                                        <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
