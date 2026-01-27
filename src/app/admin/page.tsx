import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import {
    FolderKanban,
    FileText,
    MessageSquare,
    ArrowUpRight,
    Clock,
    Briefcase,
    Mail
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getDashboardData() {
    const [
        projectsCount,
        postsCount,
        messagesCount,
        recentProjects,
        recentMessages
    ] = await Promise.all([
        db.project.count(),
        db.blogPost.count(),
        db.contactMessage.count({ where: { read: false } }),
        db.project.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        }),
        db.contactMessage.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            where: { read: false }
        })
    ]);

    return {
        counts: { projects: projectsCount, posts: postsCount, messages: messagesCount },
        recentProjects,
        recentMessages
    };
}

export default async function AdminDashboard() {
    const data = await getDashboardData();
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="p-6 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back! Here's what's happening today, {currentDate}.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/admin/projects/new">
                            <Briefcase className="mr-2 h-4 w-4" /> New Project
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/admin/projects">
                    <Card className="h-full hover:shadow-md transition-all border-l-4 border-l-primary cursor-pointer">
                        <CardHeader className="flex flex-col items-center justify-center pb-2 space-y-0">
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <FolderKanban className="h-4 w-4 text-primary" />
                                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">{data.counts.projects}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Showcased in your portfolio
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/blog">
                    <Card className="h-full hover:shadow-md transition-all border-l-4 border-l-blue-500 cursor-pointer">
                        <CardHeader className="flex flex-col items-center justify-center pb-2 space-y-0">
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">{data.counts.posts}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Published articles
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/messages">
                    <Card className="h-full hover:shadow-md transition-all border-l-4 border-l-orange-500 cursor-pointer">
                        <CardHeader className="flex flex-col items-center justify-center pb-2 space-y-0">
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <MessageSquare className="h-4 w-4 text-orange-500" />
                                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">{data.counts.messages}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Requires your attention
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Projects */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Projects</CardTitle>
                        <CardDescription>
                            Review the latest projects you've added.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.recentProjects.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No projects yet.</p>
                            ) : (
                                data.recentProjects.map((project) => (
                                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/40">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <FolderKanban className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{project.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(project.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant={project.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                                            {project.status.toLowerCase()}
                                        </Badge>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <Button variant="ghost" className="w-full text-xs" asChild>
                                <Link href="/admin/projects">
                                    View All Projects <ArrowUpRight className="ml-2 h-3 w-3" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Messages</CardTitle>
                        <CardDescription>
                            Latest inquiries from your contact form.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.recentMessages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                        <Mail className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm font-medium">No new messages</p>
                                    <p className="text-xs text-muted-foreground">You're all caught up!</p>
                                </div>
                            ) : (
                                data.recentMessages.map((msg) => (
                                    <div key={msg.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mt-1 flex-shrink-0">
                                            <MessageSquare className="h-4 w-4 text-orange-600" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{msg.name}</p>
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                {msg.message}
                                            </p>
                                            <div className="flex items-center pt-1">
                                                <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {data.recentMessages.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                                <Button variant="ghost" className="w-full text-xs" asChild>
                                    <Link href="/admin/messages">
                                        View All Messages <ArrowUpRight className="ml-2 h-3 w-3" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
