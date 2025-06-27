"use client";

import { useState } from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { LotDetailSheet } from '@/components/map/LotDetailSheet';
import { type Lot, lots } from '@/lib/mock-data';
import { useTranslation } from '@/hooks/use-translation';

export default function MapPage() {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const t = useTranslation();

  const handleSelectLot = (lot: Lot | null) => {
    setSelectedLot(lot);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{t('mapTitle')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('mapSubtitle')}</p>
      </div>
      <div className="relative">
        <InteractiveMap lots={lots} selectedLot={selectedLot} onSelectLot={handleSelectLot} />
      </div>
      <LotDetailSheet lot={selectedLot} onOpenChange={(open) => !open && setSelectedLot(null)} />
    </div>
  );
}
