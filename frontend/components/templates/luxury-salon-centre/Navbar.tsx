"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { TemplateNavItem } from "@/data/templates/luxury-salon-centre";

type NavbarProps = {
  brandName: string;
  brandHref: string;
  links: TemplateNavItem[];
  ctaLabel: string;
  whatsappHref: string;
  mobileMenuAriaLabel: string;
};

export default function Navbar({
  brandName,
  brandHref,
  links,
  ctaLabel,
  whatsappHref,
  mobileMenuAriaLabel
}: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = useMemo(() => links, [links]);

  return (
    <header className="sticky top-0 z-50 border-b border-luxury-base/10 bg-white/80 backdrop-blur-xl">
      <div className="shell-container">
        <div className="flex h-20 items-center justify-between">
          <Link href={brandHref} className="font-heading text-lg font-semibold tracking-wide text-luxury-base sm:text-xl">
            {brandName}
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition ${
                    active ? "text-luxury-goldDark" : "text-luxury-base/80 hover:text-luxury-base"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a href={whatsappHref} className="luxury-button bg-luxury-gold text-luxury-base shadow-card hover:bg-luxury-goldDark">
              {ctaLabel}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-luxury-base/20 text-luxury-base lg:hidden"
            aria-label={mobileMenuAriaLabel}
          >
            <span className="text-lg">≡</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-luxury-base/10 bg-white lg:hidden">
          <div className="shell-container space-y-4 py-5">
            <nav className="grid gap-3">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-3 py-2 text-sm font-medium ${
                      active ? "bg-luxury-gold/15 text-luxury-goldDark" : "text-luxury-base/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <a href={whatsappHref} className="luxury-button w-full bg-luxury-gold text-luxury-base">
              {ctaLabel}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
