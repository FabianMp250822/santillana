
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Trees, Flame, Dribbble, Puzzle, Bike } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Portería de Lujo',
    description: 'A grand entrance with 24/7 security that promises exclusivity and peace of mind.',
  },
  {
    icon: <Trees className="w-8 h-8 text-primary" />,
    title: '2 Islas Privadas',
    description: 'Your own piece of paradise within the community, perfect for relaxation and private events.',
  },
  {
    icon: <Flame className="w-8 h-8 text-primary" />,
    title: 'Zonas de BBQ',
    description: 'Perfect spaces for creating unforgettable memories with family and friends.',
  },
  {
    icon: <Dribbble className="w-8 h-8 text-primary" />,
    title: 'Canchas Deportivas',
    description: 'Stay active with our professional-grade tennis and multi-purpose courts.',
  },
  {
    icon: <Puzzle className="w-8 h-8 text-primary" />,
    title: 'Parque Infantil',
    description: 'A safe and fun dedicated area for children to play, learn, and explore.',
  },
  {
    icon: <Bike className="w-8 h-8 text-primary" />,
    title: 'Cicloruta & Gimnasio',
    description: 'Enjoy a scenic bike path and an outdoor bio-healthy gym surrounded by nature.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Aerial view of Santillana Del Mar"
          data-ai-hint="aerial view real estate"
          layout="fill"
          objectFit="cover"
          className="z-0 brightness-50"
          priority
        />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-shadow-lg">
            Santillana Del Mar
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200">
            Discover a sanctuary where luxury meets nature.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-accent text-primary-foreground font-bold text-lg">
            <Link href="/map">Explore the Project</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">An Unparalleled Lifestyle</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Santillana del Mar is more than a home; it's a destination. Experience a unique blend of comfort, elegance, and natural beauty.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg hover:border-primary transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
         <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Your Future Awaits</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to find your dream property? Our team is here to guide you every step of the way.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground font-bold text-lg">
                    <Link href="/financing">Financing Options</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg font-bold">
                    <Link href="/contact">Contact Us</Link>
                </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
