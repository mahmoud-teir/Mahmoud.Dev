# Mahmoud Abu Teir - Portfolio

A modern, professional portfolio website built with Next.js 15.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 + Shadcn/ui
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Auth**: Better Auth
- **Email**: Resend
- **i18n**: next-intl (Arabic/English)
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
npx prisma migrate dev

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # App Router pages
├── components/       # React components
│   ├── ui/           # Shadcn/ui components
│   ├── layout/       # Header, Footer, Sidebar
│   ├── home/         # Homepage sections
│   ├── projects/     # Project components
│   ├── blog/         # Blog components
│   └── admin/        # Admin dashboard
├── lib/              # Utilities & configs
├── actions/          # Server Actions
├── hooks/            # Custom React hooks
├── types/            # TypeScript types
└── i18n/             # Internationalization
```

## Features

- 🌍 Bilingual (Arabic/English with RTL)
- 🌙 Dark/Light mode
- 📱 Fully responsive
- ⚡ SSG + ISR for performance
- 🔐 Admin dashboard for content management
- ✉️ Contact form with email notifications

## Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run ESLint
npx prisma studio # Database GUI
```

## Code Conventions

- Use Server Components by default
- Add "use client" only when needed
- Use Server Actions for mutations
- Zod for all input validation
- Logical CSS properties for RTL support

## License

MIT
