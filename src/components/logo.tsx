import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-10 h-10 text-primary", className)}
        >
            <g stroke="currentColor" strokeWidth="6" strokeLinejoin="round">
                {/* Bottom Layer */}
                <path d="M50 85 L10 65 L50 45 L90 65 Z" />

                {/* Middle Layer */}
                <path d="M50 65 L10 45 L50 25 L90 45 Z" />

                {/* Top Layer (Floating) */}
                <path d="M50 45 L25 32.5 L50 20 L75 32.5 Z" strokeOpacity="0.8" />
            </g>
        </svg>
    );
}
