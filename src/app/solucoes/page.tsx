import type { Metadata } from "next";
import Link from "next/link";
import { getProductsBySegment } from "@/data/catalog";
import { segments } from "@/data/company";
import { CtaBanner, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Soluções por mercado",
  description: "Caminhos específicos para fabricantes de cadeiras, revendas, mercado corporativo, e-commerce e licitações.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Soluções por mercado"
        title="Cada mercado tem uma necessidade. Cada uma tem um caminho."
        description="Selecione o seu perfil para ver quais produtos, documentos e canais de atendimento resolvem a sua demanda."
      />
      <section className="bg-steel-50 py-12 md:py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {segments.map((s) => {
            const n = getProductsBySegment(s.slug).length;
            return (
              <Link key={s.slug} href={`/solucoes/${s.slug}`} className="group rounded-lg border border-steel-200 bg-white p-7 transition-shadow hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <span className="text-3xl" aria-hidden>{s.icon}</span>
                  <span className="rounded bg-steel-100 px-2 py-0.5 text-xs font-semibold text-steel-600">{n} produtos indicados</span>
                </div>
                <h2 className="mt-4 text-xl font-black text-steel-900 group-hover:text-brand-600">{s.name}</h2>
                <p className="mt-1 font-medium text-steel-700">{s.headline}</p>
                <p className="mt-3 text-sm text-steel-600">{s.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.documents.slice(0, 3).map((d) => (
                    <span key={d} className="rounded border border-steel-200 px-2 py-0.5 text-xs text-steel-600">{d}</span>
                  ))}
                </div>
                <span className="mt-5 block text-sm font-bold text-brand-600">Ver solução completa →</span>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
