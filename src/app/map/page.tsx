"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { LotDetailSheet } from '@/components/map/LotDetailSheet';
import { type Lot, lots } from '@/lib/mock-data';
import { useTranslation } from '@/hooks/use-translation';
import { Skeleton } from '@/components/ui/skeleton';

function MapContent() {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const t = useTranslation();
  const searchParams = useSearchParams();

  useEffect(() => {
    const lotIdFromQuery = searchParams.get('lot');
    if (lotIdFromQuery) {
      const lotToSelect = lots.find(lot => lot.id === lotIdFromQuery);
      if (lotToSelect && lotToSelect.status !== 'Sold') {
        setSelectedLot(lotToSelect);
      }
    }
  }, [searchParams]);

  const handleSelectLot = (lot: Lot | null) => {
    setSelectedLot(lot);
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('mapTitle')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('mapSubtitle')}</p>
      </div>
      <div className="relative">
        <InteractiveMap lots={lots} selectedLot={selectedLot} onSelectLot={handleSelectLot} />
      </div>
      <LotDetailSheet lot={selectedLot} onOpenChange={(open) => !open && setSelectedLot(null)} />
    </>
  );
}

export default function MapPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={
          <div>
            <div className="text-center mb-8">
              <Skeleton className="h-12 w-1/2 mx-auto" />
              <Skeleton className="h-6 w-2/3 mx-auto mt-4" />
            </div>
            <Skeleton className="w-full aspect-video relative rounded-lg" />
          </div>
        }>
        <MapContent />
      </Suspense>
    </div>
  );
}
