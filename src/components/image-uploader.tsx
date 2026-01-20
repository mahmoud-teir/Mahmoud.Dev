"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type ImageUploaderProps = {
    value: string;
    onChange: (url: string) => void;
    endpoint: "imageUploader" | "cvUploader";
};

export function ImageUploader({ value, onChange, endpoint }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);

    return (
        <div className="space-y-2">
            {value ? (
                <div className="relative inline-block">
                    <img
                        src={value}
                        alt="Uploaded image"
                        className="max-h-48 rounded-md border"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => onChange("")}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <UploadButton
                    endpoint={endpoint}
                    onUploadBegin={() => setUploading(true)}
                    onClientUploadComplete={(res) => {
                        setUploading(false);
                        if (res?.[0]?.url) {
                            onChange(res[0].url);
                        }
                    }}
                    onUploadError={(error: Error) => {
                        setUploading(false);
                        console.error("Upload error:", error);
                    }}
                />
            )}
            {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
        </div>
    );
}
