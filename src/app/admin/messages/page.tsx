import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkAsReadButton } from "./mark-read-button";
import { Mail, Calendar, User } from "lucide-react";

async function getMessages() {
    return db.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export default async function AdminMessagesPage() {
    const messages = await getMessages();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Messages</h1>
                <Badge variant="secondary">
                    {messages.filter((m) => !m.read).length} Unread
                </Badge>
            </div>

            {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No messages yet. They will appear here when visitors contact you.
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <Card key={message.id} className={message.read ? "opacity-60" : ""}>
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            {message.name}
                                        </CardTitle>
                                        {!message.read && <Badge>New</Badge>}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <a href={`mailto:${message.email}`} className="text-primary hover:underline">
                                            {message.email}
                                        </a>
                                    </div>
                                    {message.subject && (
                                        <p className="font-medium">Subject: {message.subject}</p>
                                    )}
                                    <p className="text-muted-foreground whitespace-pre-wrap">
                                        {message.message}
                                    </p>
                                    <div className="flex gap-2 pt-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={`mailto:${message.email}?subject=Re: ${message.subject || "Your message"}`}>
                                                Reply
                                            </a>
                                        </Button>
                                        {!message.read && <MarkAsReadButton messageId={message.id} />}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
