"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Heart, Mail, User } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const t = useTranslation();
    // Mock user data
    const user = {
        name: "Alex Doe",
        email: "alex.doe@example.com",
        avatar: "https://placehold.co/100x100.png"
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('profileTitle')}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {t('profileSubtitle')}
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person avatar"/>
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Button variant="outline" asChild>
                                <Link href="/login">{t('logOut')}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{t('dashboard')}</CardTitle>
                            <CardDescription>{t('dashboardDesc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href="/favorites" className="block">
                                <div className="flex items-center p-4 border rounded-lg hover:bg-card/80 transition-colors">
                                    <Heart className="h-6 w-6 mr-4 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">{t('myFavorites')}</h3>
                                        <p className="text-sm text-muted-foreground">{t('myFavoritesDesc')}</p>
                                    </div>
                                </div>
                            </Link>
                             <Link href="/contact" className="block">
                                <div className="flex items-center p-4 border rounded-lg hover:bg-card/80 transition-colors">
                                    <Mail className="h-6 w-6 mr-4 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">{t('contactSupport')}</h3>
                                        <p className="text-sm text-muted-foreground">{t('contactSupportDesc')}</p>
                                    </div>
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
