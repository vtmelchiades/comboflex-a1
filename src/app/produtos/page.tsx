import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/data/catalog";
import { CtaBanner, PageHero } from "@/components/ui";
import { ProductExplorer } from "@/components/ProductExplorer";

export const metadata: Metadata = {
  title: "Produtos – Componentes para cadeiras de escritório",
  description:
    "Catálogo de back systems, mecanismos, sistemas relax, lâminas, estruturas, pistões e flanges Comboflex, com código, medidas e compatibilidades.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Produtos"
        title="Catálogo de componentes por família"
        description="Cada produto tem código, medidas, material, acabamento, variações, aplicações e compatibilidades. Preços e condições comerciais são informados pelo atendimento."
      >
        <Link href="/catalogo" className="btn-primary">Baixar catálogo técnico</Link>
        <Link href="/orcamento" className="btn bg-white text-steel-900 hover:bg-steel-100">Solicitar orçamento</Link>
      </PageHero>

      <section className="border-b border-steel-200 bg-white">
        <div className="container-x grid grid-cols-2 gap-3 py-8 md:grid-cols-4 lg:grid-cols-7">
          {categories.map((c) => (
            <Link key={c.slug} href={`/produtos/${c.slug}`} className="group flex flex-col items-center rounded-lg border border-steel-200 p-3 text-center hover:border-brand-400">
              <span className="relative h-16 w-16 overflow-hidden rounded-full bg-steel-100">
                <Image src={c.image} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="mt-2 text-sm font-semibold text-steel-800 group-hover:text-brand-600">{c.shortName}</span>
              <span className="text-xs text-steel-500">{products.filter((p) => p.category === c.slug).length} itens</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-steel-50 py-12 md:py-16">
        <div className="container-x">
          <ProductExplorer />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
