"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = () => {
        const newLocale = locale === "en" ? "ar" : "en";

        // Remove current locale from pathname and add new one
        const segments = pathname.split("/").filter(Boolean);
        if (segments[0] === "en" || segments[0] === "ar") {
            segments[0] = newLocale;
        } else {
            segments.unshift(newLocale);
        }

        router.push("/" + segments.join("/"));
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={switchLocale}
            title={locale === "en" ? "التبديل للعربية" : "Switch to English"}
        >
            <Globe className="h-5 w-5" />
            <span className="sr-only">
                {locale === "en" ? "التبديل للعربية" : "Switch to English"}
            </span>
        </Button>
    );
}
