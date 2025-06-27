"use client";

import { Home, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">Santillana Del Mar</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <Link href="/map" className="text-sm text-muted-foreground hover:text-foreground">{t('navMap')}</Link>
            <Link href="/gallery" className="text-sm text-muted-foreground hover:text-foreground">{t('navGallery')}</Link>
            <Link href="/amenities" className="text-sm text-muted-foreground hover:text-foreground">{t('navAmenities')}</Link>
            <Link href="/financing" className="text-sm text-muted-foreground hover:text-foreground">{t('navFinancing')}</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">{t('navContact')}</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border pt-4">
          <p>&copy; {new Date().getFullYear()} Santillana Del Mar. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
