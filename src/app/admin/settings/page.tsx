import { db } from "@/lib/db";
import { SettingsForm } from "./settings-form";

async function getSettings() {
    let settings = await db.siteSettings.findUnique({
        where: { id: "settings" },
    });

    if (!settings) {
        settings = await db.siteSettings.create({
            data: { id: "settings" },
        });
    }

    return settings;
}

export default async function AdminSettingsPage() {
    const settings = await getSettings();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Site Settings</h1>
            <SettingsForm settings={settings} />
        </div>
    );
}
