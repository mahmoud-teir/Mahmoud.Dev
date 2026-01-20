"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="border-t py-8">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Mahmoud Abu Teir. {t("rights")}
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {t("madeWith")} <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </p>
                </div>
            </div>
        </footer>
    );
}
