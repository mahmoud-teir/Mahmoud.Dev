"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Logo } from "@/components/logo";

export function MobileNav() {
    const t = useTranslations("nav");
    const [open, setOpen] = useState(false);

    const navLinks = [
        { href: "/about", label: t("about") },
        { href: "/projects", label: t("projects") },
        { href: "/blog", label: t("blog") },
        { href: "/experience", label: t("experience") },
        { href: "/contact", label: t("contact") },
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col gap-6 pl-2">
                <SheetTitle className="sr-only">Mobile NavigationMenu</SheetTitle>
                <div className="px-7">
                    <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter" onClick={() => setOpen(false)}>
                        <Logo className="h-8 w-8 text-primary" />
                        <span>Mahmoud<span className="text-primary">Teir</span></span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-4 px-7">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="mt-4">
                        <Button asChild className="w-full" onClick={() => setOpen(false)}>
                            <Link href="/contact">{t("contact")}</Link>
                        </Button>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
