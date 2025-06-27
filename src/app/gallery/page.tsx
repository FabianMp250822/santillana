"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryCategories } from "@/lib/mock-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share2, Expand } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function GalleryPage() {
  const { toast } = useToast();
  
  const handleShareClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/gallery`);
    toast({ title: "Link Copied!", description: "A shareable link to the gallery has been copied." });
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Multimedia Showcase</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore the beauty and luxury of Santillana Del Mar.
        </p>
      </div>

      <Tabs defaultValue={galleryCategories[0].name} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {galleryCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {galleryCategories.map((category) => (
          <TabsContent key={category.name} value={category.name}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.images.map((image, index) => (
                <Dialog key={index}>
                  <Card className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="aspect-w-4 aspect-h-3 relative">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          data-ai-hint={image.hint}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                           <DialogTrigger asChild>
                            <Button variant="secondary" size="icon">
                                <Expand className="h-5 w-5" />
                                <span className="sr-only">Expand</span>
                            </Button>
                           </DialogTrigger>
                          <Button variant="secondary" size="icon" onClick={handleShareClick}>
                            <Share2 className="h-5 w-5" />
                            <span className="sr-only">Share</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <DialogContent className="max-w-4xl p-0 border-0">
                      <Image
                          src={image.src}
                          alt={image.alt}
                          data-ai-hint={image.hint}
                          width={1200}
                          height={800}
                          className="rounded-lg w-full h-auto"
                        />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
