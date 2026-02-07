import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell-container py-16 sm:py-20">
      <h1 className="font-heading text-4xl text-luxury-base sm:text-5xl">zencodify templates</h1>
      <p className="mt-4 max-w-2xl text-luxury-base/75">
        Open template routes to preview scaffolds.
      </p>
      <ul className="mt-8 space-y-3 text-sm sm:text-base">
        <li>
          <Link className="text-luxury-goldDark hover:underline" href="/templates/modern-minimal-salon">
            Modern Minimal Salon
          </Link>
        </li>
        <li>
          <Link className="text-luxury-goldDark hover:underline" href="/templates/luxury-salon-centre">
            Luxury Salon Centre
          </Link>
        </li>
        <li>
          <Link className="text-luxury-goldDark hover:underline" href="/templates/salon-luxury">
            Salon Luxury (placeholder)
          </Link>
        </li>
      </ul>
    </main>
  );
}
