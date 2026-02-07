import Link from "next/link";
import type {
  TemplateNavItem,
  TemplateSocialLinks
} from "@/data/templates/luxury-salon-centre";

type FooterProps = {
  brandName: string;
  tagline: string;
  links: TemplateNavItem[];
  phoneNumber: string;
  whatsappNumber: string;
  address: string;
  businessHours: string[];
  social?: TemplateSocialLinks;
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
  social,
  quickLinksTitle,
  contactTitle,
  hoursTitle,
  copyright
}: FooterProps) {
  const socialEntries = [
    ["website", social?.website],
    ["instagram", social?.instagram],
    ["facebook", social?.facebook],
    ["youtube", social?.youtube],
    ["linkedin", social?.linkedin],
    ["x", social?.x],
    ["google maps", social?.googleMaps]
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <footer className="mt-10 bg-luxury-base py-14 text-white">
      <div className="shell-container">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-heading text-2xl text-luxury-gold">{brandName}</p>
            <p className="mt-4 max-w-xs text-sm text-white/75">{tagline}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-luxury-gold">{quickLinksTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-luxury-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-luxury-gold">{contactTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              <li>
                <a href={`tel:${phoneNumber}`} className="hover:text-luxury-gold">
                  {phoneNumber}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-luxury-gold">
                  {whatsappNumber}
                </a>
              </li>
              <li>{address}</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-luxury-gold">{hoursTitle}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {businessHours.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
          </div>
        </div>
        {socialEntries.length > 0 ? (
          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              Social
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socialEntries.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/85 hover:text-luxury-gold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
        <p className="mt-10 border-t border-white/15 pt-6 text-xs text-white/60">© {new Date().getFullYear()} {copyright}</p>
      </div>
    </footer>
  );
}
