import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsBySegment } from "@/data/catalog";
import { company, getSegment, qualityDocuments, segments, whatsappLink } from "@/data/company";
import { Breadcrumbs, CtaBanner, PageHero, ProductCard, SectionTitle } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams() {
  return segments.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSegment(slug);
  if (!s) return {};
  return { title: `Soluções para ${s.name}`, description: s.headline };
}

export default async function SegmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const seg = getSegment(slug);
  if (!seg) notFound();
  const items = getProductsBySegment(seg.slug);
  const phone = seg.slug === "revendas" || seg.slug === "ecommerce" ? company.phones[1] : company.phones[0];
  const docs = qualityDocuments.filter((d) => d.status === "disponivel").slice(0, 5);

  return (
    <>
      <PageHero eyebrow={`Soluções • ${seg.name}`} title={seg.headline} description={seg.description}>
        <Link href={`/orcamento?segmento=${seg.slug}`} className="btn-primary">{seg.cta}</Link>
        <a href={whatsappLink(phone.digits, `Olá! Sou do segmento ${seg.name} e gostaria de atendimento.`)} target="_blank" rel="noreferrer" className="btn-whatsapp">
          WhatsApp {phone.number}
        </a>
      </PageHero>

      <section className="bg-white py-10 md:py-14">
        <div className="container-x">
          <Breadcrumbs items={[{ href: "/solucoes", label: "Soluções por mercado" }, { label: seg.name }]} />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-steel-200 p-6">
              <h2 className="text-lg font-bold text-steel-900">O que esse mercado precisa</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-steel-700">
                {seg.needs.map((n) => (
                  <li key={n} className="flex gap-2"><span className="mt-0.5 text-brand-500">■</span>{n}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-steel-200 bg-steel-50 p-6">
              <h2 className="text-lg font-bold text-steel-900">Documentos que atendem essa necessidade</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-steel-700">
                {seg.documents.map((d) => (
                  <li key={d} className="flex gap-2"><span className="text-green-600">✓</span>{d}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/qualidade" className="btn-outline px-4 py-2">Ver área de qualidade</Link>
                <Link href={`/orcamento?tipo=documentacao&segmento=${seg.slug}`} className="btn-dark px-4 py-2">Solicitar documentos</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-steel-50 py-12 md:py-16">
        <div className="container-x">
          <SectionTitle eyebrow="Produtos indicados" title={`Componentes para ${seg.name.toLowerCase()}`} description="Seleção dos itens do catálogo mais adequados a esse perfil. Todos com ficha técnica e compatibilidades." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-xl font-black text-steel-900">Documentação já disponível</h2>
            <ul className="mt-4 divide-y divide-steel-100 rounded-lg border border-steel-200 text-sm">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="font-semibold text-steel-900">{d.title}</p>
                    <p className="text-xs text-steel-500">{d.type} • {d.scope}</p>
                  </div>
                  <Link href="/qualidade" className="shrink-0 text-xs font-semibold text-brand-600">Detalhes →</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-steel-900 p-6 text-white">
            <h2 className="text-xl font-black">Como avançar</h2>
            <ol className="mt-4 space-y-3 text-sm text-steel-200">
              <li><strong className="text-white">1.</strong> Selecione os produtos acima ou envie seu desenho/edital.</li>
              <li><strong className="text-white">2.</strong> Solicite orçamento ou amostra – roteamos ao representante da sua UF.</li>
              <li><strong className="text-white">3.</strong> Receba a proposta com prazo, condições e documentação anexa.</li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={`/orcamento?segmento=${seg.slug}`} className="btn-primary">{seg.cta}</Link>
              <Link href="/amostras" className="btn border border-white/30 text-white hover:bg-white/10">Solicitar amostra</Link>
            </div>
          </div>
        </div>
        <div className="container-x mt-10">
          <p className="text-sm font-semibold text-steel-500">Outros mercados</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {segments.filter((s) => s.slug !== seg.slug).map((s) => (
              <Link key={s.slug} href={`/solucoes/${s.slug}`} className="rounded-md border border-steel-300 px-3 py-1.5 text-sm font-medium hover:border-brand-500 hover:text-brand-600">
                {s.icon} {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
