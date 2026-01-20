import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

async function getPost(slug: string) {
    return db.blogPost.findUnique({
        where: { slug, status: "PUBLISHED" },
    });
}

async function getRelatedPosts(postId: string, tags: string[]) {
    return db.blogPost.findMany({
        where: {
            id: { not: postId },
            status: "PUBLISHED",
            tags: { hasSome: tags },
        },
        take: 3,
    });
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("blog");
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(post.id, post.tags);

    return (
        <div className="py-16">
            <div className="container max-w-3xl">
                {/* Back Button */}
                <Button variant="ghost" asChild className="mb-8">
                    <Link href="/blog">
                        <ArrowLeft className="h-4 w-4 me-2" />
                        Back to Blog
                    </Link>
                </Button>

                {/* Post Header */}
                <article>
                    <header className="mb-8">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            {post.publishedAt && (
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(post.publishedAt).toLocaleDateString(locale, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            )}
                            {post.readTime && (
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {post.readTime} {t("minRead")}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    {/* Share */}
                    <div className="flex items-center gap-4 pt-8 border-t">
                        <span className="text-sm font-medium">Share this article:</span>
                        <Button variant="outline" size="sm" asChild>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Share2 className="h-4 w-4 me-1" />
                                Twitter
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Share2 className="h-4 w-4 me-1" />
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                        <div className="grid gap-4">
                            {relatedPosts.map((related) => (
                                <Card key={related.id}>
                                    <CardContent className="p-4">
                                        <Link href={`/blog/${related.slug}`}>
                                            <h3 className="font-semibold hover:text-primary transition-colors">
                                                {related.title}
                                            </h3>
                                        </Link>
                                        {related.excerpt && (
                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                                {related.excerpt}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
