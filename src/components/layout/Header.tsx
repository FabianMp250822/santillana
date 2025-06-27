"use client";

import Link from 'next/link';
import { Home, Map, Images, User, Menu, X, LucideIcon, Sparkles, DollarSign, Mail, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

type NavLinkData = {
  href: string;
  labelKey: keyof typeof import('@/lib/translations').translations.en;
  icon: LucideIcon;
};

const navLinks: NavLinkData[] = [
  { href: '/', labelKey: 'navHome', icon: Home },
  { href: '/map', labelKey: 'navMap', icon: Map },
  { href: '/gallery', labelKey: 'navGallery', icon: Images },
  { href: '/amenities', labelKey: 'navAmenities', icon: Sparkles },
  { href: '/financing', labelKey: 'navFinancing', icon: DollarSign },
  { href: '/contact', labelKey: 'navContact', icon: Mail },
];

type NavLinkProps = {
  link: NavLinkData;
  onClose?: () => void;
};

const NavLink = ({ link, onClose }: NavLinkProps) => {
  const pathname = usePathname();
  const t = useTranslation();
  const isActive = pathname === link.href;

  return (
    <Link href={link.href} passHref>
      <SheetClose asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-base text-white hover:bg-white/20",
            isActive && "bg-accent/80"
          )}
          onClick={onClose}
        >
          <link.icon className="mr-2 h-5 w-5" />
          {t(link.labelKey)}
        </Button>
      </SheetClose>
    </Link>
  );
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">Santillana Del Mar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button variant={pathname === link.href ? 'secondary' : 'ghost'}>{t(link.labelKey)}</Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
           {loading ? (
             <Skeleton className="h-10 w-24" />
           ) : user ? (
            <Button asChild>
                <Link href="/profile">
                    <User className="mr-2 h-4 w-4" /> {t('navProfile')}
                </Link>
           </Button>
           ) : (
            <Button asChild variant="outline">
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
            </Button>
           )}
           <Button size="sm" variant={language === 'es' ? 'secondary' : 'ghost'} onClick={() => setLanguage('es')}>ES</Button>
            <Button size="sm" variant={language === 'en' ? 'secondary' : 'ghost'} onClick={() => setLanguage('en')}>EN</Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-0 border-0">
                <div className="relative w-full h-full overflow-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <iframe
                            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
                            src="https://www.youtube.com/embed/uvJBr8jquC0?autoplay=1&mute=1&loop=1&playlist=uvJBr8jquC0&controls=0&playsinline=1&showinfo=0&autohide=1&modestbranding=1"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            title="Santillana Del Mar Video"
                        ></iframe>
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 z-10" />

                    {/* Content */}
                    <div className="relative z-20 h-full flex flex-col p-4 text-white">
                        <div className="flex justify-between items-center mb-6">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                            <Home className="h-6 w-6 text-primary" />
                            <span className="font-headline text-lg font-bold">Santillana Del Mar</span>
                            </Link>
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                    <X className="h-6 w-6" />
                                    <span className="sr-only">{t('closeMenu')}</span>
                                </Button>
                            </SheetClose>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <NavLink key={link.href} link={link} onClose={() => setIsMobileMenuOpen(false)} />
                            ))}
                            <div className="mt-4 border-t border-white/20 pt-4">
                                {loading ? (
                                    <Skeleton className="h-10 w-full bg-white/20" />
                                ) : user ? (
                                    <Link href="/profile" passHref>
                                        <SheetClose asChild>
                                            <Button variant="ghost" className="w-full justify-start text-base text-white hover:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>
                                                <User className="mr-2 h-5 w-5" /> {t('navProfile')}
                                            </Button>
                                        </SheetClose>
                                    </Link>
                                ) : (
                                    <Link href="/login" passHref>
                                        <SheetClose asChild>
                                            <Button variant="ghost" className="w-full justify-start text-base text-white hover:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>
                                                <LogIn className="mr-2 h-5 w-5" /> Login
                                            </Button>
                                        </SheetClose>
                                    </Link>
                                )}
                            </div>
                            <div className="flex gap-2 mt-4 justify-center">
                                <Button size="sm" variant="ghost" className={cn("text-white", language === 'es' ? "bg-accent/80" : "hover:bg-white/20")} onClick={() => { setLanguage('es'); setIsMobileMenuOpen(false); }}>ES</Button>
                                <Button size="sm" variant="ghost" className={cn("text-white", language === 'en' ? "bg-accent/80" : "hover:bg-white/20")} onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}>EN</Button>
                            </div>
                        </nav>
                    </div>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
