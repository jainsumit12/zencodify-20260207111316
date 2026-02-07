import Image from "next/image";
import type { MinimalTeamMember } from "@/data/templates/modern-minimal-salon";

type TeamSectionProps = {
  title: string;
  subtitle: string;
  members: MinimalTeamMember[];
};

export default function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="shell-container">
        <div className="mb-8 max-w-3xl">
          <h2 className="font-heading text-3xl text-[#1d1b22] sm:text-4xl">{title}</h2>
          <p className="mt-4 text-[#5b5363]">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {members.map((member) => (
            <article key={member.id} className="rounded-2xl border border-[#ece7f0] bg-white p-4 shadow-soft">
              <div className="overflow-hidden rounded-xl">
                <Image src={member.image} alt={member.name} width={800} height={900} className="h-72 w-full object-cover" />
              </div>
              <div className="pt-4">
                <h3 className="font-heading text-2xl text-[#1d1b22]">{member.name}</h3>
                <p className="text-sm text-[#6a6074]">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
