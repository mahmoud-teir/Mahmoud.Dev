# Mahmoud Abu Teir - Professional Portfolio

![Project Banner](https://placehold.co/1200x400/2563eb/ffffff?text=Mahmoud+Abu+Teir+Portfolio)

A high-performance, bilingual, and fully dynamic portfolio website designed to showcase skills, projects, and professional experience. Built with the **Next.js 15 App Router** and a modern tech stack.

## 🚀 Features

### Public Interface
- **🌍 Bilingual Support**: Complete Arabic/English internationalization with automatic RTL layout.
- **🎨 Modern UI/UX**: Dark/Light mode toggle, smooth animations, and responsive design using Tailwind CSS 4 & Shadcn/ui.
- **⚡ High Performance**: Utilizing SSG (Static Site Generation) and ISR (Incremental Static Regeneration) for lightning-fast page loads.
- **🔍 Advanced Search & Filter**: Filter projects by technology and search blog posts instantly.
- **📄 CV Download**: Integrated option to download the resume directly.
- **📨 Contact System**: Secure contact form with rate limiting and instant email notifications via Resend.

### Admin Dashboard (CMS)
- **🔐 Secure Authentication**: Protected admin routes using Better Auth.
- **📂 Project Management**: Create, edit, and delete projects with rich details and drag-and-drop image uploads.
- **📝 Blog System**: Full-featured blog editor with rich text support, tags, and SEO settings.
- **💬 Testimonials**: Manage client reviews and photos.
- **⚙️ Site Settings**: Update bio, social links, and CV file directly from the dashboard.
- **📥 File Management**: Integrated **Uploadthing** for seamless image and PDF uploads.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn/ui](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **File Storage**: [Uploadthing](https://uploadthing.com/)
- **Email Service**: [Resend](https://resend.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- A PostgreSQL database (e.g., local or Neon)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mahmoud-teir/Mahmoud.Dev.git
    cd Mahmoud.Dev
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Copy the example env file:
    ```bash
    cp .env.example .env.local
    ```
    Fill in your keys in `.env.local`:
    - `DATABASE_URL` (Postgres connection string)
    - `BETTER_AUTH_SECRET` (Generate using `openssl rand -base64 32`)
    - `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID` (From Uploadthing dashboard)
    - `RESEND_API_KEY` (From Resend dashboard)

4.  **Initialize Database**
    ```bash
    npx prisma migrate dev
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router structure
│   ├── [locale]/         # Public pages (en/ar)
│   ├── admin/            # Protected admin dashboard
│   └── api/              # API routes (Uploadthing, Auth, etc.)
├── components/           # Reusable React components
│   ├── ui/               # Shadcn UI primitives
│   ├── projects/         # Project-specific components
│   └── ...
├── lib/                  # Utilities (DB, Auth, Validations)
├── actions/              # Server Actions for mutations
└── types/                # TypeScript interfaces
```

## 🚢 Deployment

The project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add your environment variables in the Vercel dashboard.
4.  Deploy!

## 📜 License

This project is licensed under the MIT License.
