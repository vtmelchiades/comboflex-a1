import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, getRelatedProducts, products } from "@/data/catalog";
import { company, segments, whatsappLink } from "@/data/company";
import { Badge, Breadcrumbs, ProductCard, TechnicalDrawing } from "@/components/ui";

type Params = { categoria: string; slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ categoria: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.name} (${p.code})`, description: p.summary };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { categoria, slug } = await params;
  const product = getProduct(slug);
  if (!product || product.category !== categoria) notFound();
  const cat = getCategory(product.category)!;
  const related = getRelatedProducts(product, 3);
  const waText = `Olá! Vim pelo site da Comboflex e gostaria de um orçamento do ${product.name} (${product.code}).`;

  return (
    <>
      <section className="border-b border-steel-200 bg-white">
        <div className="container-x py-5">
          <Breadcrumbs items={[{ href: "/produtos", label: "Produtos" }, { href: `/produtos/${cat.slug}`, label: cat.name }, { label: product.name }]} />
        </div>
      </section>

      <section className="bg-white py-8 md:py-12">
        <div className="container-x grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Galeria */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-steel-200 bg-steel-100">
              <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              {product.isNew && (
                <span className="absolute left-4 top-4 rounded bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Lançamento</span>
              )}
            </div>
            <div className="mt-6 rounded-lg border border-steel-200 p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-steel-900">Desenho técnico</h2>
                <Link href={`/orcamento?produto=${product.code}&tipo=documentacao`} className="text-sm font-semibold text-brand-600">
                  Solicitar desenho 2D/DWG →
                </Link>
              </div>
              <div className="mt-4 flex justify-center rounded bg-steel-50 p-4">
                <TechnicalDrawing product={product} />
              </div>
            </div>
          </div>

          {/* Informações */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-bold text-brand-700">{product.code}</span>
              <Badge>{cat.name}</Badge>
              {product.load && <Badge tone="green">{product.load}</Badge>}
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-steel-900 md:text-4xl">{product.name}</h1>
            <p className="mt-3 text-lg text-steel-600">{product.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-steel-700">{product.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href={`/orcamento?produto=${product.code}`} className="btn-primary">Solicitar orçamento</Link>
              <Link href={`/amostras?produto=${product.code}`} className="btn-dark">Solicitar amostra</Link>
              <a href={whatsappLink(company.phones[0].digits, waText)} target="_blank" rel="noreferrer" className="btn-whatsapp sm:col-span-2">
                Falar no WhatsApp sobre este item
              </a>
            </div>
            <p className="mt-3 text-xs text-steel-500">
              Preço e condições comerciais são informados exclusivamente pelo atendimento comercial ou representante da sua região.
            </p>

            <dl className="mt-8 divide-y divide-steel-200 rounded-lg border border-steel-200">
              <div className="grid grid-cols-3 gap-2 px-4 py-3 text-sm">
                <dt className="font-semibold text-steel-600">Material</dt>
                <dd className="col-span-2 text-steel-900">{product.material}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 py-3 text-sm">
                <dt className="font-semibold text-steel-600">Acabamento</dt>
                <dd className="col-span-2 text-steel-900">{product.finish.join(" • ")}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 py-3 text-sm">
                <dt className="font-semibold text-steel-600">Quantidade mínima</dt>
                <dd className="col-span-2 text-steel-900">{product.minOrder}</dd>
              </div>
              {product.packaging && (
                <div className="grid grid-cols-3 gap-2 px-4 py-3 text-sm">
                  <dt className="font-semibold text-steel-600">Embalagem</dt>
                  <dd className="col-span-2 text-steel-900">{product.packaging}</dd>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2 px-4 py-3 text-sm">
                <dt className="font-semibold text-steel-600">Origem</dt>
                <dd className="col-span-2 text-steel-900">Fabricação nacional – Jaú/SP</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Especificações */}
      <section className="bg-steel-50 py-12 md:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-steel-200 bg-white p-6 lg:col-span-1">
            <h2 className="text-lg font-bold text-steel-900">Medidas</h2>
            <table className="mt-4 w-full text-sm">
              <tbody className="divide-y divide-steel-100">
                {product.dimensions.map((d) => (
                  <tr key={d.label}>
                    <th className="py-2 pr-3 text-left font-medium text-steel-600">{d.label}</th>
                    <td className="py-2 text-right font-semibold text-steel-900">{d.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-steel-200 bg-white p-6">
                <h2 className="text-lg font-bold text-steel-900">Variações</h2>
                <ul className="mt-3 space-y-1.5 text-sm text-steel-700">
                  {product.variants.map((v) => (
                    <li key={v} className="flex gap-2"><span className="text-brand-500">■</span>{v}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-steel-200 bg-white p-6">
                <h2 className="text-lg font-bold text-steel-900">Aplicações</h2>
                <ul className="mt-3 space-y-1.5 text-sm text-steel-700">
                  {product.applications.map((a) => (
                    <li key={a} className="flex gap-2"><span className="text-brand-500">■</span>{a}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.segments.map((s) => {
                    const seg = segments.find((x) => x.slug === s);
                    return seg ? (
                      <Link key={s} href={`/solucoes/${s}`} className="rounded bg-steel-100 px-2 py-0.5 text-xs font-semibold text-steel-700 hover:bg-brand-50 hover:text-brand-700">
                        {seg.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-steel-200 bg-white p-6">
              <h2 className="text-lg font-bold text-steel-900">Compatibilidades</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-steel-700">
                {product.compatibility.map((c) => (
                  <li key={c} className="flex gap-2"><span className="text-green-600">✓</span>{c}</li>
                ))}
              </ul>
              {product.technicalNotes && (
                <>
                  <h3 className="mt-5 text-sm font-bold uppercase tracking-wider text-steel-500">Notas técnicas</h3>
                  <ul className="mt-2 space-y-1 text-sm text-steel-700">
                    {product.technicalNotes.map((n) => (
                      <li key={n}>• {n}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-6">
              <h2 className="font-bold text-steel-900">Documentação disponível para este item</h2>
              <p className="mt-1 text-sm text-steel-700">
                Ficha técnica em PDF, desenho 2D, certificado de matéria-prima e, quando aplicável, laudo de ensaio. Solicite ao comercial ou consulte a{" "}
                <Link href="/qualidade" className="font-semibold text-brand-700">área de qualidade</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="container-x">
            <h2 className="text-2xl font-black text-steel-900">Compatíveis e relacionados</h2>
            <p className="mt-1 text-steel-600">Componentes que costumam ser especificados junto com o {product.name}.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
