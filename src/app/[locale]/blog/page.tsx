import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
    params: Promise<{ locale: string }>;
};

async function getBlogPosts() {
    return db.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
    });
}

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("blog");
    const posts = await getBlogPosts();

    return (
        <div className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {posts.length === 0 ? (
                    <p className="text-center text-muted-foreground">{t("noPosts")}</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                <div className="aspect-video bg-muted" />
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        {post.publishedAt && (
                                            <span>
                                                {new Date(post.publishedAt).toLocaleDateString(locale, {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        )}
                                        {post.readTime && (
                                            <>
                                                <span>•</span>
                                                <span>{post.readTime} {t("minRead")}</span>
                                            </>
                                        )}
                                    </div>
                                    <Link href={`/blog/${post.slug}`}>
                                        <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                    </Link>
                                    {post.excerpt && (
                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.slice(0, 3).map((tag: string) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
