import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory, getProductsByCategory } from "@/data/catalog";
import { Breadcrumbs, CtaBanner, PageHero, ProductCard } from "@/components/ui";

type Params = { categoria: string };

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return {};
  return { title: `${cat.name} para cadeiras de escritório`, description: cat.description };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) notFound();
  const items = getProductsByCategory(cat.slug);

  return (
    <>
      <PageHero eyebrow="Família de produtos" title={cat.name} description={cat.description} image={cat.image}>
        <Link href={`/orcamento?categoria=${cat.slug}`} className="btn-primary">Solicitar orçamento desta linha</Link>
        <Link href="/catalogo" className="btn bg-white text-steel-900 hover:bg-steel-100">Catálogo técnico</Link>
      </PageHero>
      <section className="bg-white py-10 md:py-14">
        <div className="container-x">
          <Breadcrumbs items={[{ href: "/produtos", label: "Produtos" }, { label: cat.name }]} />
          <div className="mt-6 flex flex-wrap gap-2">
            {cat.highlights.map((h) => (
              <span key={h} className="rounded-full border border-steel-200 bg-steel-50 px-3 py-1 text-sm text-steel-700">✓ {h}</span>
            ))}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-12 rounded-lg border border-steel-200 bg-steel-50 p-6">
            <h2 className="font-bold text-steel-900">Outras famílias</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories
                .filter((c) => c.slug !== cat.slug)
                .map((c) => (
                  <Link key={c.slug} href={`/produtos/${c.slug}`} className="rounded-md border border-steel-300 bg-white px-3 py-1.5 text-sm font-medium hover:border-brand-500 hover:text-brand-600">
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
