import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Import messages statically to avoid dynamic import issues
import en from "../../messages/en.json";
import ar from "../../messages/ar.json";

const messages = { en, ar };

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;

    if (!locale || !locales.includes(locale as Locale)) {
        notFound();
    }

    return {
        locale,
        messages: messages[locale as Locale],
    };
});
