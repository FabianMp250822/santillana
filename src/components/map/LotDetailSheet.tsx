"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { type Lot } from "@/lib/mock-data";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Heart, Share2 } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

interface LotDetailSheetProps {
  lot: Lot | null;
  onOpenChange: (open: boolean) => void;
}

export function LotDetailSheet({ lot, onOpenChange }: LotDetailSheetProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  if (!lot) return null;

  const isFavorited = isFavorite(lot.id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(lot.id);
      toast({ title: "Removed from Favorites", description: `Lot ${lot.id} has been removed from your favorites.` });
    } else {
      addFavorite(lot.id);
      toast({ title: "Added to Favorites!", description: `Lot ${lot.id} has been added to your favorites.` });
    }
  };
  
  const handleShareClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/map?lot=${lot.id}`);
    toast({ title: "Link Copied!", description: "A shareable link to this lot has been copied to your clipboard." });
  }

  const statusVariant: "default" | "secondary" | "destructive" | "outline" | null | undefined = 
    lot.status === 'Available' ? 'default' : lot.status === 'Reserved' ? 'secondary' : 'destructive';


  return (
    <Sheet open={!!lot} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <SheetHeader className="p-6">
          <div className="flex justify-between items-start">
            <div>
                <SheetTitle className="font-headline text-3xl">Lot {lot.id}</SheetTitle>
                <SheetDescription className="text-lg">{lot.area} m²</SheetDescription>
            </div>
            <Badge variant={statusVariant} className="text-sm">{lot.status}</Badge>
          </div>
        </SheetHeader>
        <div className="px-6 pb-6">
            <p className="text-muted-foreground">{lot.description}</p>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {lot.images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video relative">
                  <Image src={src} data-ai-hint="lot view" alt={`View of lot ${lot.id} #${index + 1}`} layout="fill" objectFit="cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        <div className="p-6 flex gap-4">
          <Button className="w-full" onClick={handleFavoriteClick}>
            <Heart className={`mr-2 h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
            {isFavorited ? "Favorited" : "Me Interesa"}
          </Button>
          <Button variant="outline" className="w-full" onClick={handleShareClick}>
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
