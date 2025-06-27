
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { amenities } from "@/lib/mock-data";
import Image from "next/image";

export default function AmenitiesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Exclusive Amenities</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover a world of comfort, recreation, and luxury designed for an unparalleled lifestyle at Santillana Del Mar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {amenities.map((amenity) => (
          <Card key={amenity.name} className="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary">
            <div className="relative aspect-video w-full">
              <Image 
                src={amenity.image} 
                alt={amenity.name} 
                data-ai-hint={amenity.hint}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform"
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{amenity.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{amenity.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
