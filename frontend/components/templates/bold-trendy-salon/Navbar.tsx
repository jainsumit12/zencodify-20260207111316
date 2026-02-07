"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { BoldNavItem } from "@/data/templates/bold-trendy-salon";

type NavbarProps = {
  logoText: string;
  logoHref: string;
  links: BoldNavItem[];
  ctaLabel: string;
  ctaHref: string;
  mobileMenuAriaLabel: string;
};

export default function Navbar({
  logoText,
  logoHref,
  links,
  ctaLabel,
  ctaHref,
  mobileMenuAriaLabel
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08070f]/85 backdrop-blur-xl">
      <div className="shell-container">
        <div className="flex h-20 items-center justify-between">
          <Link href={logoHref} className="font-heading text-lg font-semibold tracking-wide text-white sm:text-xl">
            {logoText}
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition ${
                    active ? "text-[#ff4bc4]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a
              href={ctaHref}
              className="luxury-button rounded-full bg-gradient-to-r from-[#ff4bc4] to-[#7b5cff] px-6 text-white shadow-[0_0_24px_rgba(255,75,196,0.35)] hover:brightness-110"
            >
              {ctaLabel}
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileMenuAriaLabel}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            <span className="text-lg">≡</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0d0b16] lg:hidden">
          <div className="shell-container space-y-4 py-5">
            <nav className="grid gap-2">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-2 text-sm font-medium ${
                      active ? "bg-[#2a1334] text-[#ff6ad0]" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <a
              href={ctaHref}
              className="luxury-button w-full rounded-full bg-gradient-to-r from-[#ff4bc4] to-[#7b5cff] text-white"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
