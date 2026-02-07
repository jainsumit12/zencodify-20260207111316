"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { parseSiteSpec, type TemplateId } from "@/template-engine/renderTemplate";
import { patchGeneratedSpec } from "@/lib/specPatch";

type SiteType = "multipage" | "one_page";

type AdminFormState = {
  templateId: TemplateId;
  siteType: SiteType;
  businessName: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  services: string;
  website: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  x: string;
  googleMaps: string;
  logoUrl: string;
  coverImageUrl: string;
  galleryImageUrls: string;
};

const INITIAL_FORM_STATE: AdminFormState = {
  templateId: "luxury-salon-centre",
  siteType: "multipage",
  businessName: "",
  category: "Salon & Beauty",
  city: "",
  address: "",
  phone: "",
  whatsapp: "",
  hours: "",
  services: "",
  website: "",
  instagram: "",
  facebook: "",
  youtube: "",
  linkedin: "",
  x: "",
  googleMaps: "",
  logoUrl: "",
  coverImageUrl: "",
  galleryImageUrls: ""
};

const SAMPLE_FORM_STATE: AdminFormState = {
  templateId: "modern-minimal-salon",
  siteType: "multipage",
  businessName: "Glow Beauty Studio",
  category: "Salon & Beauty",
  city: "Ludhiana",
  address: "SCF 38, Feroze Gandhi Market, Ludhiana, Punjab 141001",
  phone: "+919812345678",
  whatsapp: "+919812345678",
  hours: "Mon-Sat: 10:00 AM - 8:30 PM\nSun: 11:00 AM - 6:00 PM",
  services: "Haircut, Hair Color, Keratin, Bridal Makeup, Nail Art, Hydra Facial",
  website: "https://glowbeautystudio.example.com",
  instagram: "https://instagram.com/glowbeautystudio",
  facebook: "https://facebook.com/glowbeautystudio",
  youtube: "",
  linkedin: "",
  x: "",
  googleMaps: "https://maps.google.com/?q=Glow+Beauty+Studio+Ludhiana",
  logoUrl:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=320&q=80",
  coverImageUrl:
    "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=1400&q=80",
  galleryImageUrls: [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=900&q=80"
  ].join("\n")
};

function toStringList(value: string, splitByComma: boolean): string[] | undefined {
  const tokens = (splitByComma ? value.split(/\r?\n|,/) : value.split(/\r?\n/))
    .map((token) => token.trim())
    .filter((token) => token.length > 0);

  return tokens.length > 0 ? tokens : undefined;
}

export default function AdminPage() {
  const router = useRouter();
  const [form, setForm] = useState<AdminFormState>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
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
          hours: toStringList(form.hours, true),
          services: toStringList(form.services, true)
        })
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        missingFields?: string[];
        spec?: unknown;
      };

      if (!response.ok) {
        const missingFields =
          payload.missingFields && payload.missingFields.length > 0
            ? ` Missing: ${payload.missingFields.join(", ")}.`
            : "";
        throw new Error((payload.message || "Failed to generate SiteSpec.") + missingFields);
      }

      if (!payload.spec) {
        throw new Error("Backend did not return a spec payload.");
      }

      const generatedSpec = parseSiteSpec(payload.spec);
      const patchedSpec = patchGeneratedSpec(generatedSpec, {
        logoUrl: form.logoUrl,
        coverImageUrl: form.coverImageUrl,
        galleryImageUrls: toStringList(form.galleryImageUrls, false),
        social: {
          website: form.website,
          instagram: form.instagram,
          facebook: form.facebook,
          youtube: form.youtube,
          linkedin: form.linkedin,
          x: form.x,
          googleMaps: form.googleMaps
        }
      });

      const finalSpec = parseSiteSpec(patchedSpec);
      localStorage.setItem("zencodify_admin_spec", JSON.stringify(finalSpec));
      router.push("/admin/preview");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error while generating admin preview.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "mt-1.5 w-full rounded-xl border border-[#dacfe5] bg-white px-3 py-2.5 text-sm text-[#2b2233] outline-none focus:border-[#8d6ac8]";

  return (
    <main className="shell-container py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-3xl text-luxury-base sm:text-4xl">Admin Test Form</h1>
            <p className="mt-2 text-sm text-luxury-base/75 sm:text-base">
              Generate a SiteSpec using backend AI, patch optional social/assets, and preview locally.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setForm(SAMPLE_FORM_STATE)}
            className="rounded-full border border-luxury-base/20 px-4 py-2 text-sm font-semibold text-luxury-base hover:bg-luxury-base hover:text-white"
          >
            Use sample data
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-[#e8e0ee] bg-white p-5 shadow-soft sm:p-6">
              <h2 className="font-heading text-xl text-luxury-base">Template + Business</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-luxury-base/80">
                  <span>Template</span>
                  <select
                    value={form.templateId}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        templateId: event.target.value as TemplateId
                      }))
                    }
                    className={inputClassName}
                  >
                    <option value="luxury-salon-centre">luxury-salon-centre</option>
                    <option value="modern-minimal-salon">modern-minimal-salon</option>
                    <option value="bold-trendy-salon">bold-trendy-salon</option>
                  </select>
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>Site Type</span>
                  <select
                    value={form.siteType}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        siteType: event.target.value as SiteType
                      }))
                    }
                    className={inputClassName}
                  >
                    <option value="multipage">multipage</option>
                    <option value="one_page">one_page</option>
                  </select>
                </label>

                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>Business Name</span>
                  <input
                    required
                    value={form.businessName}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, businessName: event.target.value }))
                    }
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>Category</span>
                  <input
                    required
                    value={form.category}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, category: event.target.value }))
                    }
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>City</span>
                  <input
                    required
                    value={form.city}
                    onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>Phone</span>
                  <input
                    required
                    placeholder="+9198XXXXXXXX"
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>WhatsApp</span>
                  <input
                    required
                    placeholder="+9198XXXXXXXX"
                    value={form.whatsapp}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, whatsapp: event.target.value }))
                    }
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>Address</span>
                  <input
                    required
                    value={form.address}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, address: event.target.value }))
                    }
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>Hours (optional)</span>
                  <textarea
                    rows={3}
                    value={form.hours}
                    onChange={(event) => setForm((prev) => ({ ...prev, hours: event.target.value }))}
                    className={`${inputClassName} resize-y`}
                    placeholder="Mon-Sat: 10:00 AM - 8:00 PM"
                  />
                </label>

                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>Services (optional, comma/new line separated)</span>
                  <textarea
                    rows={4}
                    value={form.services}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, services: event.target.value }))
                    }
                    className={`${inputClassName} resize-y`}
                    placeholder="Haircut, Hair Color, Keratin, Nail Art"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e8e0ee] bg-white p-5 shadow-soft sm:p-6">
              <h2 className="font-heading text-xl text-luxury-base">Optional Social + Assets</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>Website</span>
                  <input
                    value={form.website}
                    onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
                    className={inputClassName}
                    placeholder="https://example.com"
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>Instagram</span>
                  <input
                    value={form.instagram}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, instagram: event.target.value }))
                    }
                    className={inputClassName}
                    placeholder="https://instagram.com/yourbrand"
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>Facebook</span>
                  <input
                    value={form.facebook}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, facebook: event.target.value }))
                    }
                    className={inputClassName}
                    placeholder="https://facebook.com/yourbrand"
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>YouTube</span>
                  <input
                    value={form.youtube}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, youtube: event.target.value }))
                    }
                    className={inputClassName}
                    placeholder="https://youtube.com/@yourbrand"
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>LinkedIn</span>
                  <input
                    value={form.linkedin}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, linkedin: event.target.value }))
                    }
                    className={inputClassName}
                    placeholder="https://linkedin.com/company/yourbrand"
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>X</span>
                  <input
                    value={form.x}
                    onChange={(event) => setForm((prev) => ({ ...prev, x: event.target.value }))}
                    className={inputClassName}
                    placeholder="https://x.com/yourbrand"
                  />
                </label>

                <label className="text-sm text-luxury-base/80">
                  <span>Google Maps</span>
                  <input
                    value={form.googleMaps}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, googleMaps: event.target.value }))
                    }
                    className={inputClassName}
                    placeholder="https://maps.google.com/?q=Your+Business"
                  />
                </label>

                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>logoUrl (optional)</span>
                  <input
                    value={form.logoUrl}
                    onChange={(event) => setForm((prev) => ({ ...prev, logoUrl: event.target.value }))}
                    className={inputClassName}
                    placeholder="https://..."
                  />
                </label>

                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>coverImageUrl (optional)</span>
                  <input
                    value={form.coverImageUrl}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, coverImageUrl: event.target.value }))
                    }
                    className={inputClassName}
                    placeholder="https://..."
                  />
                </label>

                <label className="text-sm text-luxury-base/80 sm:col-span-2">
                  <span>galleryImageUrls (optional, one URL per line)</span>
                  <textarea
                    rows={6}
                    value={form.galleryImageUrls}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, galleryImageUrls: event.target.value }))
                    }
                    className={`${inputClassName} resize-y`}
                    placeholder={"https://...\nhttps://..."}
                  />
                </label>
              </div>
            </section>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-luxury-base px-5 py-3 text-sm font-semibold text-white transition hover:bg-luxury-base/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Generating and preparing preview..." : "Generate + Open Preview"}
          </button>
        </form>
      </div>
    </main>
  );
}
