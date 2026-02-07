import Link from "next/link";
import type { MinimalNavItem } from "@/data/templates/modern-minimal-salon";

type FooterProps = {
  brandName: string;
  tagline: string;
  links: MinimalNavItem[];
  phoneNumber: string;
  whatsappNumber: string;
  address: string;
  businessHours: string[];
  quickLinksTitle: string;
  contactTitle: string;
  hoursTitle: string;
  copyright: string;
};

export default function Footer({
  brandName,
  tagline,
  links,
  phoneNumber,
  whatsappNumber,
  address,
  businessHours,
  quickLinksTitle,
  contactTitle,
  hoursTitle,
  copyright
}: FooterProps) {
  return (
    <footer className="mt-10 border-t border-[#ece6ef] bg-white py-14">
      <div className="shell-container">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="font-heading text-2xl text-[#1d1b22]">{brandName}</p>
            <p className="mt-4 max-w-xs text-sm text-[#5b5363]">{tagline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d5f7a]">{quickLinksTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#534b5d]">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#1d1b22]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d5f7a]">{contactTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#534b5d]">
              <li>
                <a href={`tel:${phoneNumber}`} className="hover:text-[#1d1b22]">
                  {phoneNumber}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-[#1d1b22]">
                  {whatsappNumber}
                </a>
              </li>
              <li>{address}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d5f7a]">{hoursTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#534b5d]">
              {businessHours.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-[#ede7f0] pt-6 text-xs text-[#7a7183]">© {new Date().getFullYear()} {copyright}</p>
      </div>
    </footer>
  );
}
