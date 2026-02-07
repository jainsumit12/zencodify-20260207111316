import Link from "next/link";
import type { BoldNavItem } from "@/data/templates/bold-trendy-salon";

type FooterProps = {
  brandName: string;
  tagline: string;
  links: BoldNavItem[];
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
    <footer className="border-t border-white/10 bg-[#05040b] py-14">
      <div className="shell-container">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="font-heading text-2xl text-white">{brandName}</p>
            <p className="mt-4 max-w-xs text-sm text-white/65">{tagline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c3afff]">{quickLinksTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c3afff]">{contactTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <a href={`tel:${phoneNumber}`} className="hover:text-white">
                  {phoneNumber}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-white">
                  {whatsappNumber}
                </a>
              </li>
              <li>{address}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c3afff]">{hoursTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {businessHours.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">© {new Date().getFullYear()} {copyright}</p>
      </div>
    </footer>
  );
}
