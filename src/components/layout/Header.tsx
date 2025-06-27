
"use client";

import Link from 'next/link';
import { Home, Map, Images, User, Menu, X, LucideIcon, Sparkles, DollarSign, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/gallery', label: 'Gallery', icon: Images },
  { href: '/amenities', label: 'Amenities', icon: Sparkles },
  { href: '/financing', label: 'Financing', icon: DollarSign },
  { href: '/contact', label: 'Contact', icon: Mail },
];

type NavLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  onClose?: () => void;
};

const NavLink = ({ href, label, icon: Icon, onClose }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <SheetClose asChild>
        <Button
          variant={isActive ? 'secondary' : 'ghost'}
          className={cn("w-full justify-start text-base", isActive ? "text-primary-foreground" : "text-foreground")}
          onClick={onClose}
        >
          <Icon className="mr-2 h-5 w-5" />
          {label}
        </Button>
      </SheetClose>
    </Link>
  );
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
              <Button variant={pathname === link.href ? 'secondary' : 'ghost'}>{link.label}</Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
           <Button asChild>
                <Link href="/profile">
                    <User className="mr-2 h-4 w-4" /> Profile
                </Link>
           </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-4">
              <div className="flex justify-between items-center mb-6">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-bold">Santillana Del Mar</span>
                </Link>
                 <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                    </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} onClose={() => setIsMobileMenuOpen(false)} />
                ))}
                 <div className="mt-4 border-t pt-4">
                    <Link href="/profile" passHref>
                        <SheetClose asChild>
                            <Button variant="ghost" className="w-full justify-start text-base" onClick={() => setIsMobileMenuOpen(false)}>
                                <User className="mr-2 h-5 w-5" /> Profile
                            </Button>
                        </SheetClose>
                    </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
