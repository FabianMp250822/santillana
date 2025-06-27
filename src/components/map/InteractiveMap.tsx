"use client";

import Image from 'next/image';
import { type Lot, type LotStatus } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from '@/hooks/use-translation';

interface InteractiveMapProps {
  lots: Lot[];
  selectedLot: Lot | null;
  onSelectLot: (lot: Lot | null) => void;
}

const statusColors: Record<LotStatus, string> = {
  Available: 'fill-green-500/50 hover:fill-green-500/80 stroke-green-300',
  Reserved: 'fill-yellow-500/50 hover:fill-yellow-500/80 stroke-yellow-300',
  Sold: 'fill-red-500/50 hover:fill-red-500/80 stroke-red-400 cursor-not-allowed',
};

export function InteractiveMap({ lots, selectedLot, onSelectLot }: InteractiveMapProps) {
  const t = useTranslation();
  return (
    <div className="w-full aspect-video relative bg-card rounded-lg shadow-lg overflow-hidden border">
      <Image
        src="https://placehold.co/1600x900.png"
        alt="Santillana Del Mar project map"
        data-ai-hint="real estate map"
        layout="fill"
        objectFit="cover"
      />
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 420 420"
      >
        <TooltipProvider>
            {lots.map((lot) => (
            <Tooltip key={lot.id}>
                <TooltipTrigger asChild>
                    <path
                        d={lot.path}
                        className={cn(
                        'cursor-pointer transition-all duration-200',
                        statusColors[lot.status],
                        selectedLot?.id === lot.id ? 'fill-primary/80 stroke-accent' : ''
                        )}
                        strokeWidth="2"
                        onClick={() => lot.status !== 'Sold' && onSelectLot(lot)}
                    />
                </TooltipTrigger>
                <TooltipContent className='font-sans'>
                    <p className='font-bold'>{t('lot')} {lot.id}</p>
                    <p>{t('status')}: {t(lot.status.toLowerCase() as any)}</p>
                    <p>{t('area')}: {lot.area} m²</p>
                </TooltipContent>
            </Tooltip>
            ))}
        </TooltipProvider>
      </svg>
      <div className="absolute bottom-4 right-4 bg-background/80 p-3 rounded-lg border">
        <ul className="space-y-2 text-sm">
            <li className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-500/80 mr-2"></span> {t('available')}</li>
            <li className="flex items-center"><span className="w-4 h-4 rounded-full bg-yellow-500/80 mr-2"></span> {t('reserved')}</li>
            <li className="flex items-center"><span className="w-4 h-4 rounded-full bg-red-500/80 mr-2"></span> {t('sold')}</li>
        </ul>
      </div>
    </div>
  );
}
