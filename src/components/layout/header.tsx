"use client";

import { Logo } from "@/components/logo";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

import { MobileNav } from "@/components/layout/mobile-nav";

export default function Header() {
    const t = useTranslations("nav");

    const navLinks = [
        { href: "/about", label: t("about") },
        { href: "/projects", label: t("projects") },
        { href: "/blog", label: t("blog") },
        { href: "/experience", label: t("experience") },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-2">
                    <Logo className="h-10 w-10 text-primary" />
                    <span>Mahmoud <span className="text-primary">Teir</span></span>
                </Link>

                <nav className="desktop-nav items-center gap-6">
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
                    <Button asChild className="desktop-contact-btn">
                        <Link href="/contact">{t("contact")}</Link>
                    </Button>
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
