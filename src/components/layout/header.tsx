"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Header() {
    const t = useTranslations("nav");

    const navLinks = [
        { href: "/about", label: t("about") },
        { href: "/projects", label: t("projects") },
        { href: "/blog", label: t("blog") },
        { href: "/experience", label: t("experience") },
        { href: "/contact", label: t("contact") },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-2">
                    <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
                    <span>Mahmoud<span className="text-primary">.Dev</span></span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button asChild className="hidden md:inline-flex">
                        <Link href="/contact">{t("contact")}</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
