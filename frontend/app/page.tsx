import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>zencodify</h1>
      <p>Scaffold ready. Use these routes to verify template routing:</p>
      <ul>
        <li>
          <Link href="/templates/salon-luxury">Salon Luxury - Home</Link>
        </li>
        <li>
          <Link href="/templates/salon-luxury/about">Salon Luxury - About</Link>
        </li>
        <li>
          <Link href="/templates/salon-luxury/services">
            Salon Luxury - Services
          </Link>
        </li>
        <li>
          <Link href="/templates/salon-luxury/gallery">
            Salon Luxury - Gallery
          </Link>
        </li>
        <li>
          <Link href="/templates/salon-luxury/contact">
            Salon Luxury - Contact
          </Link>
        </li>
      </ul>
    </main>
  );
}
