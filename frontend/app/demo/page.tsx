"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type DemoFormState = {
  businessName: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  services: string;
  hours: string;
  templateId: "luxury-salon-centre" | "modern-minimal-salon" | "bold-trendy-salon";
  siteType: "multipage" | "one_page";
};

const initialState: DemoFormState = {
  businessName: "",
  category: "Salon & Beauty",
  city: "",
  address: "",
  phone: "",
  whatsapp: "",
  services: "",
  hours: "",
  templateId: "luxury-salon-centre",
  siteType: "multipage"
};

function toLines(value: string): string[] | undefined {
  const lines = value
    .split(/\r?\n|,/g)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return lines.length > 0 ? lines : undefined;
}

export default function DemoPage() {
  const router = useRouter();
  const [form, setForm] = useState<DemoFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const response = await fetch(`${apiBase}/demo/generate-sitespec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          templateId: form.templateId,
          siteType: form.siteType,
          businessName: form.businessName.trim(),
          category: form.category.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          phone: form.phone.trim(),
          whatsapp: form.whatsapp.trim(),
          services: toLines(form.services),
          hours: toLines(form.hours)
        })
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        spec?: unknown;
        missingFields?: string[];
      };

      if (!response.ok) {
        const missingFields =
          payload.missingFields && payload.missingFields.length > 0
            ? ` Missing: ${payload.missingFields.join(", ")}.`
            : "";
        throw new Error((payload.message || "Failed to generate SiteSpec.") + missingFields);
      }

      if (!payload.spec) {
        throw new Error("API did not return a generated spec.");
      }

      localStorage.setItem("zencodify_demo_spec", JSON.stringify(payload.spec));
      router.push("/demo/preview");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error while generating demo SiteSpec.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="shell-container py-14 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#ece6ef] bg-white p-6 shadow-soft sm:p-8">
        <h1 className="font-heading text-3xl text-luxury-base sm:text-4xl">Local Demo Mode</h1>
        <p className="mt-3 text-sm text-luxury-base/70 sm:text-base">
          Fill your business details, generate a schema-valid SiteSpec using backend AI, and preview via
          template renderer stubs.
        </p>

        <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="text-sm text-luxury-base/75">
            <span>Business Name</span>
            <input
              required
              value={form.businessName}
              onChange={(event) => setForm((prev) => ({ ...prev, businessName: event.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
            />
          </label>

          <label className="text-sm text-luxury-base/75">
            <span>Category</span>
            <input
              required
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
            />
          </label>

          <label className="text-sm text-luxury-base/75">
            <span>City</span>
            <input
              required
              value={form.city}
              onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
            />
          </label>

          <label className="text-sm text-luxury-base/75">
            <span>Address</span>
            <input
              required
              value={form.address}
              onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
            />
          </label>

          <label className="text-sm text-luxury-base/75">
            <span>Phone</span>
            <input
              required
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
            />
          </label>

          <label className="text-sm text-luxury-base/75">
            <span>WhatsApp</span>
            <input
              required
              value={form.whatsapp}
              onChange={(event) => setForm((prev) => ({ ...prev, whatsapp: event.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
            />
          </label>

          <label className="text-sm text-luxury-base/75">
            <span>Template</span>
            <select
              value={form.templateId}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  templateId: event.target.value as DemoFormState["templateId"]
                }))
              }
              className="mt-1.5 w-full rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
            >
              <option value="luxury-salon-centre">luxury-salon-centre</option>
              <option value="modern-minimal-salon">modern-minimal-salon</option>
              <option value="bold-trendy-salon">bold-trendy-salon</option>
            </select>
          </label>

          <label className="text-sm text-luxury-base/75">
            <span>Site Type</span>
            <select
              value={form.siteType}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  siteType: event.target.value as DemoFormState["siteType"]
                }))
              }
              className="mt-1.5 w-full rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
            >
              <option value="multipage">multipage</option>
              <option value="one_page">one_page</option>
            </select>
          </label>

          <label className="text-sm text-luxury-base/75 sm:col-span-2">
            <span>Services (optional, one per line or comma separated)</span>
            <textarea
              rows={4}
              value={form.services}
              onChange={(event) => setForm((prev) => ({ ...prev, services: event.target.value }))}
              className="mt-1.5 w-full resize-y rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
              placeholder="Haircut, Hair Color, Keratin, Nail Art"
            />
          </label>

          <label className="text-sm text-luxury-base/75 sm:col-span-2">
            <span>Business Hours (optional, one per line)</span>
            <textarea
              rows={3}
              value={form.hours}
              onChange={(event) => setForm((prev) => ({ ...prev, hours: event.target.value }))}
              className="mt-1.5 w-full resize-y rounded-xl border border-luxury-base/15 px-3 py-2.5 outline-none focus:border-luxury-goldDark"
              placeholder="Mon-Sat: 10 AM - 8 PM"
            />
          </label>

          <div className="sm:col-span-2">
            <button
              disabled={loading}
              type="submit"
              className="luxury-button w-full rounded-full bg-luxury-base text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Generating SiteSpec..." : "Generate and Preview"}
            </button>
          </div>
        </form>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
      </div>
    </main>
  );
}
