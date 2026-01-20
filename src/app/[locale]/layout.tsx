import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "en" | "ar")) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();
    const isRTL = locale === "ar";

    return (
        <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-cairo" : "font-inter"}>
            <NextIntlClientProvider messages={messages}>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </NextIntlClientProvider>
        </div>
    );
}
