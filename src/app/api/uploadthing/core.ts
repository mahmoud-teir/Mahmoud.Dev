import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    // Image uploader for projects and blog posts
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            // Add auth check here if needed
            return {};
        })
        .onUploadComplete(async ({ file }) => {
            console.log("Image uploaded:", file.ufsUrl);
            return { url: file.ufsUrl };
        }),

    // CV/PDF uploader
    cvUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
        .middleware(async () => {
            return {};
        })
        .onUploadComplete(async ({ file }) => {
            console.log("CV uploaded:", file.ufsUrl);
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
