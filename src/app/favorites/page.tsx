"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { lots } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";

export default function FavoritesPage() {
    const { favorites, removeFavorite } = useFavorites();
    const { toast } = useToast();
    const t = useTranslation();
    const favoriteLots = lots.filter(lot => favorites.includes(lot.id));

    const handleRemove = (lotId: string) => {
        removeFavorite(lotId);
        toast({ title: t('toastRemovedFromFavorites'), description: t('toastRemovedDesc').replace('{lotId}', lotId) });
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('favoritesTitle')}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {t('favoritesSubtitle')}
                </p>
            </div>

            {favoriteLots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteLots.map(lot => (
                        <Card key={lot.id} className="flex flex-col">
                            <CardHeader>
                                <div className="aspect-[4/3] relative rounded-t-lg overflow-hidden">
                                 <Image src={lot.images[0]} alt={`${t('lot')} ${lot.id}`} layout="fill" objectFit="cover" data-ai-hint="lot view" />
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardTitle className="font-headline text-2xl">{t('lot')} {lot.id}</CardTitle>
                                <CardDescription className="text-base">{lot.area} m²</CardDescription>
                                <p className="text-muted-foreground mt-2 text-sm">{t(lot.descriptionKey)}</p>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={`/map?lot=${lot.id}`}>{t('viewOnMap')}</Link>
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleRemove(lot.id)}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">{t('removeFavorite')}</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-xl font-semibold">{t('noFavoritesTitle')}</h2>
                    <p className="mt-2 text-muted-foreground">
                        {t('noFavoritesDesc')}
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/map">{t('exploreLots')}</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
