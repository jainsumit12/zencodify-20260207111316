import Link from "next/link";
import { SiteSpecSchema } from "@zencodify/shared";
import { SalonLuxuryPreviewSpec } from "../../../data/templates/salon-luxury";

const validationResult =
  process.env.NODE_ENV === "development"
    ? SiteSpecSchema.safeParse(SalonLuxuryPreviewSpec)
    : { success: true as const };

export default function SalonLuxuryHomePage() {
  return (
    <main>
      <h1>Salon Luxury - Home</h1>
      <p>{validationResult.success ? "Spec valid" : "Spec invalid"}</p>
      <ul>
        <li>
          <Link href="/templates/salon-luxury/about">About</Link>
        </li>
        <li>
          <Link href="/templates/salon-luxury/services">Services</Link>
        </li>
        <li>
          <Link href="/templates/salon-luxury/gallery">Gallery</Link>
        </li>
        <li>
          <Link href="/templates/salon-luxury/contact">Contact</Link>
        </li>
      </ul>
    </main>
  );
}
