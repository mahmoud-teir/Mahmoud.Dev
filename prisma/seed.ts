import { db } from "../src/lib/db";

async function main() {
    console.log("Seeding database...");

    // Create site settings if not exists
    await db.siteSettings.upsert({
        where: { id: "settings" },
        update: {},
        create: {
            id: "settings",
            bio: "Passionate Full-Stack Developer with expertise in building modern web applications. I love working with Next.js, React, and TypeScript to create beautiful, performant user experiences.",
            bioAr: "مطور Full-Stack شغوف ذو خبرة في بناء تطبيقات الويب الحديثة. أحب العمل مع Next.js و React و TypeScript لإنشاء تجارب مستخدم جميلة وعالية الأداء.",
            email: "mahmoud@example.com",
            github: "https://github.com/mahmoudabuteir",
            linkedin: "https://linkedin.com/in/mahmoudabuteir",
        },
    });

    // Create sample project
    await db.project.upsert({
        where: { slug: "portfolio-website" },
        update: {},
        create: {
            slug: "portfolio-website",
            title: "Portfolio Website",
            titleAr: "موقع المعرض الشخصي",
            description: "A modern portfolio website built with Next.js 15, Tailwind CSS, and Prisma.",
            descriptionAr: "موقع معرض شخصي حديث مبني بـ Next.js 15 و Tailwind CSS و Prisma.",
            technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma"],
            featured: true,
            status: "PUBLISHED",
        },
    });

    // Create sample blog post
    await db.blogPost.upsert({
        where: { slug: "getting-started-with-nextjs" },
        update: {},
        create: {
            slug: "getting-started-with-nextjs",
            title: "Getting Started with Next.js 15",
            titleAr: "البدء مع Next.js 15",
            excerpt: "Learn how to build modern web applications with Next.js 15 and the App Router.",
            excerptAr: "تعلم كيفية بناء تطبيقات الويب الحديثة مع Next.js 15 و App Router.",
            content: "# Getting Started with Next.js 15\n\nNext.js 15 introduces many exciting features...",
            tags: ["Next.js", "React", "Tutorial"],
            readTime: 5,
            status: "PUBLISHED",
            publishedAt: new Date(),
        },
    });

    // Create sample experience
    await db.experience.upsert({
        where: { id: "exp-1" },
        update: {},
        create: {
            id: "exp-1",
            company: "Tech Company",
            companyAr: "شركة تقنية",
            role: "Full-Stack Developer",
            roleAr: "مطور Full-Stack",
            description: "Building and maintaining web applications using modern technologies.",
            descriptionAr: "بناء وصيانة تطبيقات الويب باستخدام التقنيات الحديثة.",
            startDate: new Date("2022-01-01"),
            current: true,
        },
    });

    // Create sample testimonial
    await db.testimonial.upsert({
        where: { id: "test-1" },
        update: {},
        create: {
            id: "test-1",
            name: "John Doe",
            role: "CEO",
            roleAr: "الرئيس التنفيذي",
            company: "TechCorp",
            companyAr: "تك كورب",
            quote: "Mahmoud is an exceptional developer. He delivered our project on time and exceeded our expectations.",
            quoteAr: "محمود مطور استثنائي. قدم مشروعنا في الوقت المحدد وتجاوز توقعاتنا.",
            featured: true,
        },
    });

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
