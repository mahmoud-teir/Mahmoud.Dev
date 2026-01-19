import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t py-8">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Mahmoud Abu Teir. All rights reserved.
                </p>

                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/mahmoudabuteir"
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/mahmoudabuteir"
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://twitter.com/mahmoudabuteir"
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Twitter className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
