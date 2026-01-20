"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type BlogPost = {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    tags: string[];
    readTime: number | null;
    publishedAt: Date | null;
    imageUrl: string | null;
};

const POSTS_PER_PAGE = 6;

export function BlogGrid({ posts, locale }: { posts: BlogPost[]; locale: string }) {
    const t = useTranslations("blog");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Get unique tags
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
        return Array.from(tagSet).sort();
    }, [posts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch = !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = !selectedTag || post.tags.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [posts, searchQuery, selectedTag]);

    // Paginate
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    return (
        <>
            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search posts..."
                        className="ps-10"
                    />
                </div>
                {allTags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        <Button
                            variant={selectedTag === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                setSelectedTag(null);
                                setCurrentPage(1);
                            }}
                        >
                            All
                        </Button>
                        {allTags.map((tag) => (
                            <Button
                                key={tag}
                                variant={selectedTag === tag ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                    setSelectedTag(tag);
                                    setCurrentPage(1);
                                }}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* Posts Grid */}
            {paginatedPosts.length === 0 ? (
                <p className="text-center text-muted-foreground">{t("noPosts")}</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden">
                            <div className="aspect-video bg-muted">
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
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
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant={selectedTag === tag ? "default" : "secondary"}
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setSelectedTag(tag);
                                                setCurrentPage(1);
                                            }}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-4 text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </>
    );
}
