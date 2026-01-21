import { db } from "@/lib/db";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogGrid } from "@/components/blog-grid";

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

                <BlogGrid posts={posts} locale={locale} />
            </div>
        </div>
    );
}
