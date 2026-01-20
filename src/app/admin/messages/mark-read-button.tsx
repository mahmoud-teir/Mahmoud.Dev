"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export function MarkAsReadButton({ messageId }: { messageId: string }) {
    const router = useRouter();

    const handleMarkAsRead = async () => {
        await fetch(`/api/messages/${messageId}/read`, {
            method: "POST",
        });
        router.refresh();
    };

    return (
        <Button variant="secondary" size="sm" onClick={handleMarkAsRead}>
            <Check className="h-4 w-4 mr-1" /> Mark as Read
        </Button>
    );
}
