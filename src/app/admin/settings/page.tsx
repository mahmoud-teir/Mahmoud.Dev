import { db } from "@/lib/db";
import { SettingsForm } from "./settings-form";
import { AccountForm } from "./account-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <Tabs defaultValue="site" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="site">Site Settings</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="site">
                    <SettingsForm settings={settings} />
                </TabsContent>

                <TabsContent value="account">
                    <AccountForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
