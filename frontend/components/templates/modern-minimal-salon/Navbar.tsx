"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MinimalNavItem } from "@/data/templates/modern-minimal-salon";

type NavbarProps = {
  logoText: string;
  logoHref: string;
  links: MinimalNavItem[];
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
    <header className="sticky top-0 z-50 border-b border-[#ece8ee] bg-white/95 backdrop-blur">
      <div className="shell-container">
        <div className="flex h-20 items-center justify-between">
          <Link href={logoHref} className="font-heading text-xl text-[#1d1b22]">
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
                    active ? "text-[#5f4f6f]" : "text-[#4f4a57] hover:text-[#1d1b22]"
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
              className="luxury-button rounded-full bg-[#e7dbe7] px-6 text-[#2f2435] hover:bg-[#d8c6dd]"
            >
              {ctaLabel}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={mobileMenuAriaLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ece8ee] text-[#2f2435] lg:hidden"
          >
            <span className="text-xl">≡</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[#ece8ee] bg-white lg:hidden">
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
                      active ? "bg-[#f4edf4] text-[#5f4f6f]" : "text-[#4f4a57]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <a href={ctaHref} className="luxury-button w-full bg-[#e7dbe7] text-[#2f2435]">
              {ctaLabel}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
