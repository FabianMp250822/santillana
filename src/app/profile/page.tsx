"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/use-translation";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Heart, Mail } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
    const t = useTranslation();
    const { user, loading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({ title: "Logged Out", description: "You have been successfully logged out." });
            router.push('/');
        } catch (error) {
            toast({ variant: 'destructive', title: "Error", description: "Failed to log out." });
        }
    };
    
    if (loading || !user) {
        return (
            <div className="container mx-auto py-8 px-4">
                 <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="md:col-span-1">
                        <Card>
                            <CardHeader className="items-center text-center">
                                <Skeleton className="w-24 h-24 rounded-full mb-4" />
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-40 mt-2" />
                            </CardHeader>
                            <CardContent className="text-center">
                               <Skeleton className="h-10 w-24 mx-auto" />
                            </CardContent>
                        </Card>
                     </div>
                     <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-64 mt-2" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </CardContent>
                        </Card>
                     </div>
                 </div>
            </div>
        )
    }

    const displayName = user.displayName || "User";
    const displayEmail = user.email || "No email provided";
    const avatarUrl = user.photoURL || `https://placehold.co/100x100.png`;

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
                                <AvatarImage src={avatarUrl} alt={displayName} data-ai-hint="person avatar"/>
                                <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="font-headline text-2xl">{displayName}</CardTitle>
                            <CardDescription>{displayEmail}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Button variant="outline" onClick={handleLogout}>
                                {t('logOut')}
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
