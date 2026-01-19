"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { submitContactForm } from "@/actions/contact";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { Mail, Github, Linkedin, Twitter, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactInput) => {
        setLoading(true);
        try {
            const result = await submitContactForm(data);
            if (result.success) {
                toast.success("Message sent successfully!");
                reset();
            } else {
                toast.error(result.error || "Failed to send message");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind or want to work together? I&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>
                                Fill out the form and I&apos;ll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <Input
                                        placeholder="Your Name"
                                        {...register("name")}
                                        disabled={loading}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Your Email"
                                        {...register("email")}
                                        disabled={loading}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        placeholder="Subject (optional)"
                                        {...register("subject")}
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <textarea
                                        className="w-full min-h-[150px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Your Message"
                                        {...register("message")}
                                        disabled={loading}
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                                    )}
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" /> Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-primary" />
                                        <span>mahmoud@example.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        <span>Palestine</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Follow Me</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://github.com/mahmoudabuteir"
                                        target="_blank"
                                        className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        <Github className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/mahmoudabuteir"
                                        target="_blank"
                                        className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="https://twitter.com/mahmoudabuteir"
                                        target="_blank"
                                        className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Available For</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>✓ Full-time positions</li>
                                    <li>✓ Freelance projects</li>
                                    <li>✓ Technical consulting</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
