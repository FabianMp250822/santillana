"use client";

import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { type Lot } from "@/lib/mock-data";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Textarea } from '../ui/textarea';
import { Heart, Share2, Sparkles, Loader2 } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { useAuth } from '@/hooks/use-auth';
import { designHouse, type DesignHouseOutput } from '@/ai/flows/design-house-flow';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { isFirebaseConfigured } from '@/lib/firebase';

interface LotDetailSheetProps {
  lot: Lot | null;
  onOpenChange: (open: boolean) => void;
}

export function LotDetailSheet({ lot, onOpenChange }: LotDetailSheetProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const t = useTranslation();
  const { user, loading: authLoading } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<DesignHouseOutput | null>(null);

  useEffect(() => {
    // Reset AI state when lot changes
    setPrompt("");
    setAiResult(null);
    setIsLoading(false);
  }, [lot]);


  if (!lot) return null;

  const isFavorited = isFavorite(lot.id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(lot.id);
      toast({ title: t('toastRemovedFromFavorites'), description: t('toastRemovedDesc').replace('{lotId}', lot.id) });
    } else {
      addFavorite(lot.id);
      toast({ title: t('toastAddedToFavorites'), description: t('toastAddedDesc').replace('{lotId}', lot.id) });
    }
  };
  
  const handleShareClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/map?lot=${lot.id}`);
    toast({ title: t('toastLinkCopied'), description: t('toastLotLinkCopied') });
  }

  const handleDesignHouse = async () => {
    // A user object (even anonymous) is required to track usage.
    if (!user) {
        toast({
            variant: 'destructive',
            title: "Log in to use AI Designer",
            description: "Please log in or sign up to create your own house designs."
        });
        return;
    }
    if (!prompt.trim()) {
      toast({ variant: 'destructive', title: "Prompt is empty", description: "Please describe your dream house." });
      return;
    }
    setIsLoading(true);
    setAiResult(null);
    try {
      const result = await designHouse({ lotId: lot.id, userPrompt: prompt, userId: user.uid });
      setAiResult(result);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "Could not generate the house design. Please try again.";
      toast({ variant: 'destructive', title: "AI Designer Error", description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }

  const statusVariant: "default" | "secondary" | "destructive" | "outline" | null | undefined = 
    lot.status === 'Available' ? 'default' : lot.status === 'Reserved' ? 'secondary' : 'destructive';
  
  const isDesignDisabled = isLoading || authLoading || !isFirebaseConfigured;

  return (
    <Sheet open={!!lot} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <div className="h-full overflow-y-auto">
            <SheetHeader className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <SheetTitle className="font-headline text-3xl">{t('lot')} {lot.id}</SheetTitle>
                    <SheetDescription className="text-lg">{lot.area} m²</SheetDescription>
                </div>
                <Badge variant={statusVariant} className="text-sm">{t(lot.status.toLowerCase() as any)}</Badge>
            </div>
            </SheetHeader>
            <div className="px-6 pb-6">
                <p className="text-muted-foreground">{t(lot.descriptionKey)}</p>
            </div>
            <Carousel className="w-full">
            <CarouselContent>
                {lot.images.map((src, index) => (
                <CarouselItem key={index}>
                    <div className="aspect-video relative">
                    <Image src={src} data-ai-hint="lot view" alt={`${t('lot')} ${lot.id} #${index + 1}`} layout="fill" objectFit="cover" />
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
            </Carousel>
            <div className="p-6 flex gap-4">
            <Button className="w-full" onClick={handleFavoriteClick} disabled={!isFirebaseConfigured}>
                <Heart className={`mr-2 h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? t('favorited') : t('imInterested')}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleShareClick}>
                <Share2 className="mr-2 h-5 w-5" />
                {t('share')}
            </Button>
            </div>

            <Separator className="my-2" />
            
            <div className="p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 font-headline text-2xl'>
                            <Sparkles className="text-primary" />
                            AI House Designer
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {isFirebaseConfigured ? "Describe your dream house. (2 free designs per day for guests)" : "AI Designer is unavailable. Please ensure Firebase is configured in .env"}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea 
                            placeholder="e.g., A modern two-story house with a large pool..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isDesignDisabled}
                        />
                        <Button className="w-full" onClick={handleDesignHouse} disabled={isDesignDisabled}>
                            {isLoading ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                                </>
                            ) : (
                                "Design My House"
                            )}
                        </Button>

                        {isLoading && (
                             <div className="space-y-4 mt-4">
                                <div className="aspect-video bg-muted rounded-lg animate-pulse" />
                                <div className="space-y-2 mt-4">
                                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                                    <div className="h-4 bg-muted rounded w-full animate-pulse" />
                                    <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                                </div>
                            </div>
                        )}

                        {aiResult && (
                             <div className="space-y-4 mt-4 border-t pt-4">
                                <h4 className="font-headline text-xl">Your Concept</h4>
                                <div className="aspect-video relative rounded-lg overflow-hidden border">
                                     <Image src={aiResult.imageUrl} alt="AI generated house" layout="fill" objectFit="cover" />
                                </div>
                               <p className="text-muted-foreground mt-2">{aiResult.description}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
