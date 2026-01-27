"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    MessageSquare,
    Settings,
    LogOut,
    Sparkles,
    Award,
    Menu,
} from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/skills", label: "Skills", icon: Sparkles },
    { href: "/admin/certifications", label: "Certifications", icon: Award },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/login";
    };

    // Idle Timeout Logic (10 minutes)
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                handleSignOut();
            }, 10 * 60 * 1000); // 10 minutes
        };

        const events = [
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress",
            "touchstart", // Mobile interaction
        ];

        // Set initial timer
        resetTimer();

        // Add listeners
        for (const event of events) {
            window.addEventListener(event, resetTimer);
        }

        // Cleanup
        return () => {
            clearTimeout(timeout);
            for (const event of events) {
                window.removeEventListener(event, resetTimer);
            }
        };
    }, []);

    const NavContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b">
                <Link href="/" className="font-bold text-xl" onClick={() => setOpen(false)}>
                    Portfolio Admin
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t mt-auto">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-card">
                <NavContent />
            </aside>

            {/* Mobile Header & Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center border-b px-4 md:hidden bg-card">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64 bg-card">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <NavContent />
                        </SheetContent>
                    </Sheet>
                    <span className="font-bold text-lg">Admin Panel</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
