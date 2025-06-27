"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, Trees, Flame, Dribbble, Puzzle, Bike } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    titleKey: 'featureLuxuryGatehouseTitle',
    descriptionKey: 'featureLuxuryGatehouseDesc',
  },
  {
    icon: <Trees className="w-8 h-8 text-primary" />,
    titleKey: 'featurePrivateIslandsTitle',
    descriptionKey: 'featurePrivateIslandsDesc',
  },
  {
    icon: <Flame className="w-8 h-8 text-primary" />,
    titleKey: 'featureBBQAreasTitle',
    descriptionKey: 'featureBBQAreasDesc',
  },
  {
    icon: <Dribbble className="w-8 h-8 text-primary" />,
    titleKey: 'featureSportsCourtsTitle',
    descriptionKey: 'featureSportsCourtsDesc',
  },
  {
    icon: <Puzzle className="w-8 h-8 text-primary" />,
    titleKey: 'featurePlaygroundTitle',
    descriptionKey: 'featurePlaygroundDesc',
  },
  {
    icon: <Bike className="w-8 h-8 text-primary" />,
    titleKey: 'featureBikePathGymTitle',
    descriptionKey: 'featureBikePathGymDesc',
  },
];

export default function Home() {
  const t = useTranslation();

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-5"></div>
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-shadow-lg">
            {t('homeHeroTitle')}
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200">
            {t('homeHeroSubtitle')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-accent text-primary-foreground font-bold text-lg">
            <Link href="/map">{t('homeHeroButton')}</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('homeLifestyleTitle')}</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('homeLifestyleSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg hover:border-primary transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle className="font-headline text-2xl">{t(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
         <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('homeCTA_Title')}</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('homeCTA_Subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground font-bold text-lg">
                    <Link href="/financing">{t('homeCTA_FinancingButton')}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg font-bold">
                    <Link href="/contact">{t('homeCTA_ContactButton')}</Link>
                </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
