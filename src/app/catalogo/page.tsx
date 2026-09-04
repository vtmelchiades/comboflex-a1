import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/catalog";
import { CatalogView } from "@/components/CatalogView";

export const metadata: Metadata = {
  title: "Catálogo técnico digital",
  description: "Catálogo técnico público da Comboflex, sem preços: códigos, medidas, desenhos, materiais e compatibilidades para consulta e download em PDF.",
};

export default function CatalogPage() {
  return (
    <>
      <section className="no-print relative overflow-hidden bg-steel-950 text-white">
        <div className="grid-pattern absolute inset-0" />
        <div className="container-x relative py-14 md:py-16">
          <p className="eyebrow text-brand-400">Catálogo técnico digital</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">Encontre o item certo em minutos</h1>
          <p className="mt-4 max-w-2xl text-steel-200">
            Versão pública, sem preços, para compradores, engenheiros e especificadores. {products.length} itens com código, medidas, desenho esquemático, material, acabamento, variações e compatibilidades. Filtre, consulte online ou gere o PDF.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/20 px-3 py-1">✓ Sem preços – condições pelo comercial</span>
            <span className="rounded-full border border-white/20 px-3 py-1">✓ Atualizado automaticamente</span>
            <span className="rounded-full border border-white/20 px-3 py-1">✓ Compartilhável por WhatsApp</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/orcamento" className="btn bg-white text-steel-900 hover:bg-steel-100">Solicitar orçamento</Link>
            <Link href="/qualidade" className="btn border border-white/40 text-white hover:bg-white/10">Documentação técnica</Link>
          </div>
        </div>
      </section>
      <section className="bg-white py-8 md:py-10">
        <div className="container-x">
          <CatalogView />
        </div>
      </section>
    </>
  );
}
