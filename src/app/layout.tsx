import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import messages from "../../messages/en.json";
import "./globals.css";
import "@uploadthing/react/styles.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: {
    default: "Mahmoud Abu Teir | Full-Stack Developer",
    template: "%s | Mahmoud Abu Teir",
  },
  description:
    "Full-Stack Developer specializing in Next.js, React, and TypeScript. Building modern web applications with beautiful user experiences.",
  keywords: ["Full-Stack Developer", "Next.js", "React", "TypeScript", "Web Developer"],
  authors: [{ name: "Mahmoud Abu Teir" }],
  creator: "Mahmoud Abu Teir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mahmoudabuteir.com",
    title: "Mahmoud Abu Teir | Full-Stack Developer",
    description: "Full-Stack Developer specializing in Next.js, React, and TypeScript.",
    siteName: "Mahmoud Abu Teir",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Abu Teir | Full-Stack Developer",
    description: "Full-Stack Developer specializing in Next.js, React, and TypeScript.",
    creator: "@mahmoudabuteir",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale="en">
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
