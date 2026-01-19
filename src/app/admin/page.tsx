import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function getStats() {
    const [projectsCount, postsCount, messagesCount] = await Promise.all([
        db.project.count(),
        db.blogPost.count(),
        db.contactMessage.count({ where: { read: false } }),
    ]);
    return { projectsCount, postsCount, messagesCount };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.projectsCount}</div>
                        <Link href="/admin/projects" className="text-sm text-muted-foreground hover:underline">
                            Manage projects →
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.postsCount}</div>
                        <Link href="/admin/blog" className="text-sm text-muted-foreground hover:underline">
                            Manage posts →
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.messagesCount}</div>
                        <Link href="/admin/messages" className="text-sm text-muted-foreground hover:underline">
                            View messages →
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
